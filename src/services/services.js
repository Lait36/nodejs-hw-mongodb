// srs/services/services.js
import { contactsCollection } from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async (page, perPage) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery = contactsCollection.find();
  const contactsCount = await contactsCollection
    .find()
    .merge(contactQuery)
    .countDocuments();
  const contacts = await contactQuery.skip(skip).limit(limit).exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
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
  const contact = await contactsCollection.findOneAndDelete({ _id: contactId });
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
