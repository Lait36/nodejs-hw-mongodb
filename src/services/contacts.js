// srs/services/services.js
import { contactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = contactsCollection.find({ userId });

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // const contactsCount = await contactsCollection
  //   .find()
  //   .merge(contactQuery)
  //   .countDocuments();
  // const contacts = await contactQuery
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder })
  //   .exec();

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
    sortOrder: sortOrder,
  };
};
export const getContactsById = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({ _id: contactId, userId });
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
export const updateContacts = async (contactId, payload, options = {}) => {
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
