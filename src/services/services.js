// srs/services/services.js
import { contactsCollection } from '../db/contacts.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};
export const getContactsById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({ _id: contactId, });
  return contact;
};
export const updateStudent = async (contactId, payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
