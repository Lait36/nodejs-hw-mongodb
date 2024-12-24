// srs/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routers/contacts.js';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pinoHttp({
      logger,
    }),
  );
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'], //Не обов'язково, вказує які значення Content-Type будуть оброблятися 
      // limit - обмеження розміру тіла
    }),
  );
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Home page',
    });
  });

  app.use(contactRoutes);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
