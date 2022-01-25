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