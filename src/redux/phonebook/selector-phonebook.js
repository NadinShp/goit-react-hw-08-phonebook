import { createSelector } from '@reduxjs/toolkit';
const getLoading = state => state.contacts.loading;
const getContacts = state => state.contacts.items;
const getFilter = state => state.contacts.filter;

const getFilterInputValue = createSelector(
  [getContacts, getFilter],
  (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
export { getLoading, getContacts, getFilter, getFilterInputValue };
