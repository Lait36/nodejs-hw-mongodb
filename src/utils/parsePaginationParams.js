// srs/utils/parsePaginationParams.js


const parseNumber = (number, defaulNumber) => {
  const isString = typeof number === 'string';
  if (!isString) return defaulNumber;
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaulNumber;
  }
  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
