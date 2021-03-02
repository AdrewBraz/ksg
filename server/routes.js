// @ts-check
import multer from 'fastify-multer';
import path from 'path';
import fs from 'fs';
import parser from './parser';
import { dsController, uslController } from '../controller/ds';
import { dsController as ksController, uslController as ksUslController } from '../controller';
import getVmpData from './getVmpData';
import filterData from './filterData';
import dataBuilder from './dataBuilder';
import excel from './excel'

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
    const { ds, usl } = _req.query
    if(!!ds){
      await dsController(ds, reply)
    }
    if(!!usl){
      await uslController(usl, reply)
    }
  })
  .get('/ks_search', async (_req, reply) => {
    console.log()
    const { ds, usl } = _req.query
    if(!!ds){
      await ksController(ds, reply)
    }
    if(!!usl){
      await ksUslController(usl, reply)
    }
  })
  .post('/report',
    { preHandler: upload.single('excel') },
    async (_req, reply) => {
      const { path } = _req.file;
      const data = await parser(path);
      const {vmpList, ksgList } = filterData(data)
      const vmp = await getVmpData(vmpList);
      const ksg = await dataBuilder(ksgList);
      fs.unlink(_req.file.path, (err) => {
        if (err) throw err;
        console.log(`${path} file was deleted`);
      });
      await excel(vmp, ksg)
      const file = fs.readFileSync(`${__dirname}/export.xlsx`);
      const stat = fs.statSync(`${__dirname}/export.xlsx`);
      reply.header('Content-Length', stat.size);
      reply.header('Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      reply.header('Content-Disposition', 'attachment; filename=export.xlsx');
      reply.send(file)
    });
