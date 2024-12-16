import { Router } from 'express';
import { getAllContacts, getContactsById } from '../services/services.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

router.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.json({
    status: 200,
    message: `Successfully find Contact with id=${contactId}`,
    data,
  });
});

export default router;
