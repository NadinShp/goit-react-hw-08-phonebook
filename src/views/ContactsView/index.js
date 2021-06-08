import { useEffect } from 'react';
import { connect } from 'react-redux';
import Contacts from '../../components/Contacts';
import ContactForm from '../../components/Form/ContactsForm';
import Filter from '../../components/Filter/Filter';
import styles from './ContactsView.module.css';
import * as contactOperations from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';

const ContactsView = ({ contacts, isLoadingContacts, fetchContacts }) => {
  useEffect(() => {
    if (contacts.length === 0) {
      fetchContacts();
    }
  }, [contacts.length, fetchContacts]);

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoadingContacts && <h1>Loading...</h1>}
      <Contacts />
    </div>
  );
};
const mapStateToProps = state => ({
  isLoadingContacts: selectors.getLoading(state),
  contacts: selectors.getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactOperations.fetchContacts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
