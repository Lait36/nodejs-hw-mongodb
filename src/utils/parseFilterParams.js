// src/utils/parseFilterParams.js

import { ALLOWED_FAVORITE_VALUES, ALLOWED_TYPES } from '../constants/constants.js';

const parseFilterType = (type) => {
  const isValidType = typeof type === 'string' && ALLOWED_TYPES.includes(type);
  return isValidType ? type : undefined;
};

const parseFilterFavourite = (favourite) => {
  const isValidFavourite =
    typeof favourite === 'string' &&
    ALLOWED_FAVORITE_VALUES.includes(favourite.toLowerCase());

  return isValidFavourite ? favourite.toLowerCase() === 'true' : undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  return {
    contactType: parseFilterType(contactType),
    isFavourite: parseFilterFavourite(isFavourite),
  };
};
