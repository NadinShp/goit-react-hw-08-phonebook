import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';
import { connect } from 'react-redux';
import * as contactOperation from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
const shortid = require('shortid');

class ContactForm extends Component {
  static defaultProps = {
    name: '',
    number: '',
  };
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleCreateContactsObject = (name, number) => {
    return {
      name,
      number,
      id: shortid.generate(),
    };
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleCleanInput();
    const { name, number } = this.state;
    const { items } = this.props;
    const checkingContact = items.find(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (checkingContact) {
      return alert(`${name} is already in contacts`);
    } else {
      const newContact = this.handleCreateContactsObject(name, number);
      this.props.onSubmit(newContact);
    }
  };
  handleCleanInput = () => {
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            value={name}
            type="text"
            onChange={this.handleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            onChange={this.handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  items: selectors.getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactOperation.addContact(contact)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
