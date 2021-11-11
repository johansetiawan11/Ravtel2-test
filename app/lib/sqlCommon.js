/* eslint-disable no-bitwise */

const defaultPageLength = 50;
const defaultPageNumber = 1;
const defaultSortDirection = "desc";

function checkIfValueInteger(value) {
  return (!Number.isNaN(value) && ((parseFloat(value) | 0) === value));
}

function checkIfValuePositiveInteger(value) {
  return (checkIfValueInteger(value) && (value >= 0));
}

function sanitizePageLength(pageLength) {
  return (checkIfValuePositiveInteger(pageLength) && (pageLength < defaultPageLength)) ? pageLength : defaultPageLength;
}

function sanitizePageNumber(pageNumber) {
  return checkIfValuePositiveInteger(pageNumber) ? pageNumber : defaultPageNumber;
}

function sanitizeSortDirection(sortDirection) {
  const llcSortDirection = sortDirection.toLocaleLowerCase();
  return (llcSortDirection === "asc") ? llcSortDirection : defaultSortDirection;
}

module.exports = {
  defaultPageLength,
  defaultPageNumber,
  defaultSortDirection,
  sanitizePageLength,
  sanitizePageNumber,
  sanitizeSortDirection,
};
