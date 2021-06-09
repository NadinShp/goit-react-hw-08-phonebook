import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as contactOperation from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const shortid = require('shortid');
const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto',
  },
  btn: {
    position: 'absolute',
    bottom: '-45px',
    left: '35%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
}));
const ContactForm = ({ onSubmit, items }) => {
  const [values, setValues] = useState({
    name: '',
    number: '',
  });
  const handleChange = prop => e => {
    const { value } = e.currentTarget;
    setValues({ ...values, [prop]: value });
  };
  const handleCreateContactsObject = (name, number) => {
    return {
      name,
      number,
      id: shortid.generate(),
    };
  };
  const handleCleanInput = () => {
    setValues({ ...values, name: '', number: '' });
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleCleanInput();
    const { name, number } = values;
    const checkingContact = items.find(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (checkingContact) {
      return alert(`${name} is already in contacts`);
    } else {
      const newContact = handleCreateContactsObject(name, number);
      onSubmit(newContact);
    }
  };
  const { name, number } = values;
  const styless = useStyles();
  return (
    <form onSubmit={handleSubmit} className={styless.form}>
      <TextField
        onChange={handleChange('name')}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoFocus
        value={name}
      />
      <TextField
        onChange={handleChange('number')}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="tel"
        label="Telephone number"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        autoFocus
        value={number}
      />
      <Button
        className={styless.btn}
        variant="contained"
        color="primary"
        type="submit"
      >
        Add contact
      </Button>
    </form>
  );
};
const mapStateToProps = state => ({
  items: selectors.getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactOperation.addContact(contact)),
});
ContactForm.defaultProps = {
  name: '',
  number: '',
};
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
