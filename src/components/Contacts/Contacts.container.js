import * as operationPhonebook from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
import { connect } from 'react-redux';
import Contacts from './Contacts';

const mapStateToProps = state => ({
  contacts: selectors.getFilterInputValue(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: idContact =>
    dispatch(operationPhonebook.deleteContact(idContact)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
