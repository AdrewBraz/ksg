// @ts-check
import path from 'path';
import Pug from 'pug';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
import mongoose from 'mongoose';
import addRoutes from './routes.js';

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;
const uri = 'mongodb://nmic:nmic414@cluster0-shard-00-00.ps4d4.mongodb.net:27017,cluster0-shard-00-01.ps4d4.mongodb.net:27017,cluster0-shard-00-02.ps4d4.mongodb.net:27017/ksg?ssl=true&replicaSet=atlas-5qaoil-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setUpViews = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

export default () => {
  const app = fastify();

  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);

  return app;
};
