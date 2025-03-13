import { SORT_ORDER } from '../constants/constants.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  if (keysOfContacts.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query) => {
  console.log("Received query:", query); // Додали логування
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);


  console.log('parser sortBy:', sortBy);  // Має бути 'name'
  console.log('parser sortOrder:', sortOrder);  // Має бути 'desc'
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
