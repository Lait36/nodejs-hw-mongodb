// srs/controllers/contacts.js
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateStudent,
} from '../services/services.js';

export const getContactsControllers = async (req, res) => {
  const data = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};
export const getContactsByIdControllers = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

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
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successful create contact',
    data: contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
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
export const upsertStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateStudent(contactId, req.body);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a student!`,
    data: contact.student,
  });
};
