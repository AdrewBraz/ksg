// @ts-check
import multer from 'fastify-multer';
import path from 'path';
import fs from 'fs';
import parser from './parser';
import { dsController, uslController } from '../controller';
import getVmpData from './getVmpData';
import filterData from './filterData';
import dataBuilder from './dataBuilder';

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
  .get('/search_ds', async (_req, reply) => {
    await dsController(_req, reply);
  })
  .get('/search_usl', async (_req, reply) => {
    await uslController(_req, reply);
  })
  .post('/report',
    { preHandler: upload.single('excel') },
    async (_req, reply) => {
      const { path } = _req.file;
      const data = await parser(path);
      const {vmpList, ksgList } = filterData(data)
      // const vmp = getVmpData(vmpList);
      dataBuilder(ksgList)
      fs.unlink(_req.file.path, (err) => {
        if (err) throw err;
        console.log(`${path} file was deleted`);
      });

      await reply.send({ data });
    });
