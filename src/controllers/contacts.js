// srs/controllers/contacts.js
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContacts,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsControllers = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactsByIdControllers = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactsById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
    // return next(new Error('Contactsnot found'));
    //     return res.status(404).json({
    //     status: 404,
    //     message: `Contact with id=${contactId} not found`,
    //     });
  }
  res.status(200).json({
    status: 200,
    message: `Successfully find Contact with id=${contactId}`,
    data: contact,
  });
};
export const createContactController = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const contact = await createContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successful create contact',
    data: contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
  // json({
  //   status: 204,
  //   message: 'Successful delete contact',
  //   data: contact,
  // });
};
export const upsertContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await updateContacts(contactId, req.body, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a student!`,
    data: contact.student,
  });
};
