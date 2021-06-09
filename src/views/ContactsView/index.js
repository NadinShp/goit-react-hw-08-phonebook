import { useEffect } from 'react';
import { connect } from 'react-redux';
import Contacts from '../../components/Contacts';
import ContactForm from '../../components/Form/ContactsForm';
import Filter from '../../components/Filter/Filter';
import * as contactOperations from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: '20px',
    textAlign: 'center',
  },
  contact: {
    marginTop: '60px',
    textAlign: 'center',
    marginBottom: '20px',
  },
}));
const ContactsView = ({ contacts, isLoadingContacts, fetchContacts }) => {
  useEffect(() => {
    if (contacts.length === 0) {
      fetchContacts();
    }
  }, [contacts.length, fetchContacts]);
  const styless = useStyles();
  return (
    <Container>
      <Typography variant="h3" className={styless.text}>
        Phonebook
      </Typography>
      <ContactForm />
      <Typography variant="h4" className={styless.contact}>
        Contacts
      </Typography>
      <Filter />
      {isLoadingContacts && <h1>Loading...</h1>}
      <Contacts />
    </Container>
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
