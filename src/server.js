import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routers/contacts.js';
import pino from 'pino';
import pinoHttp from 'pino-http';

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

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Home page',
    });
  });

  app.use(contactRoutes);

  app.get('*', (req, res) => {
    res.json({ Message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
