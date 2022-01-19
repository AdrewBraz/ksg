// @ts-check
import multer from 'fastify-multer';
import path from 'path';
import oracledb from 'oracledb';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { uniq } from 'lodash';
import { format } from 'date-fns';
import getData from './getData';
import { dsController, uslController } from '../controller/ds';
import { dsController as ksController, uslController as ksUslController } from '../controller';
import getVmpData from './getVmpData';
import filterData from './filterData';
import dataBuilder from './dataBuilder';
import excel from './excel';
import parseKslp from './parseKslp';
import xml from './xml';
import createXml from './xml/createXml';
import { kslpStr, ffoms, listOfOmsRequests } from './requestStrings';
import dbfController from './dbf';
import parser from './excelParser';
import excelParser from './excelParser';
import { medicalServList } from './utils/dbfUtils';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const config = {
  user: 'OK',
  password: 'novlv',
  connectString: '172.16.11.23:1521/promis35',
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${path.join(__dirname, './uploads')}`);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

export default (router) => router
  .get('/*', (req, reply) => {
    reply.view('index.pug');
  })
  .get('/ds_search', async (_req, reply) => {
    const query = JSON.parse(JSON.stringify(_req.query));
    const { ds, usl } = query;
    console.log(query);
    if (ds) {
      await dsController(ds, reply);
    }
    if (usl) {
      await uslController(usl, reply);
    }
  })
  .get('/ks_search', async (_req, reply) => {
    const { ds, usl } = _req.query;
    if (ds) {
      await ksController(ds, reply);
    }
    if (usl) {
      await ksUslController(usl, reply);
    }
  })
  .get('/download', (_req, reply) => {
    const file = fs.readFileSync(`${__dirname}/ФФОМС.xlsx`);
    const stat = fs.statSync(`${__dirname}/ФФОМС.xlsx`);
    reply.header('Content-Length', stat.size);
    reply.header('Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=ФФОМС.xlsx');
    reply.send(file);
  })
  .get('/data:id',
    async (_req, reply) => {
      const { id } = _req.params;
      if (fs.existsSync('C:/Users/User/Desktop/Выгрузка ФФОМС/ФФОМС.xlsx')) {
        fs.unlinkSync('C:/Users/User/Desktop/Выгрузка ФФОМС/ФФОМС.xlsx');
      }
      const requestString = ffoms[id];
      const data = await getData(oracledb, config, requestString);
      const kslpList = await getData(oracledb, config, kslpStr);
      const list = await parseKslp(kslpList);
      const { vmp, ksg } = await filterData(data, list);
      console.log(vmp,ksg)
      const vmpList = await getVmpData(vmp);
      const ksgList = await dataBuilder(ksg);
      if (id === 'excel') {
        await excel(vmpList, ksgList);
      }
      if (id === 'xml') {
        const zip = new AdmZip();
        const x = await xml({ ksgList, vmpList });
        const date = format(new Date(), 'yyMMdd');
        await createXml(x, date);
        const stat = fs.statSync(`C:/Users/User/Desktop/Выгрузка ФФОМС//FM990089F00${date}.xml`);
        await zip.addLocalFile(`C:/Users/User/Desktop/Выгрузка ФФОМС//FM990089F00${date}.xml`);
        await zip.writeZip(`C:/Users/User/Desktop/Выгрузка ФФОМС/FM990089F00${date}.zip`);
      }
      reply.send('success');
    })
  .get('/dataMega',
    async (_req, reply) => {
      const files = fs.readdirSync('C:/Users/User/Desktop/Мегаклиника');
      files.forEach((item) => {
        const name = item.slice(-3);
        if (name === 'dbf') {
          fs.unlinkSync(`C:/Users/User/Desktop/Мегаклиника/${item}`);
        }
      });
      const obj = {};
      for (const item of listOfOmsRequests) {
        const result = await getData(oracledb, config, item.req);
        const createDBF = dbfController[item.name];
        if (item.name === 'MU') {
          const interin = await excelParser();
          const res = medicalServList(result, interin);
          createDBF(res);
        } else {
          createDBF(result);
        }
      }

      reply.send('success');
    });
// .get('/report',
//   async (_req, reply) => {
//     const obj = {}
//     for( const item of listOfOmsRequests){
//       const result = await getData(oracledb, config, item.req);
//       obj[item.name] = result
//     }
//   console.log(obj)
//   }
// )
