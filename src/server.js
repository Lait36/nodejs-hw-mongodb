import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactsById } from './services/contacts.js';
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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;
    const contact = await getContactsById(contactId);
    if (!contact) {
      res.json({
        status: 404,
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successful found contact',
      data: contact,
    });
  });

  app.get('*', (req, res) => {
    res.json({ Message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
