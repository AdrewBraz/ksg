// @ts-check
import multer from 'fastify-multer';
import path from 'path';
import fs from 'fs';
import parser from './parser';
import { dsController, uslController } from '../controller';
import getVmpData from './getVmpData';

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
  .post('/calculate',
    { preHandler: upload.single('excel') },
    async (_req, reply) => {
      const { path } = _req.file;
      console.log(path);
      const data = await parser(path);
      const vmp = getVmpData(data);
      fs.unlink(_req.file.path, (err) => {
        if (err) throw err;
        console.log(`${path} file was deleted`);
      });

      await reply.send({ data });
    });
