import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { connect } from 'react-redux';
import * as actionsPhonebook from '../../redux/phonebook/actions-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';

const Filter = ({ value, onChangeFilter }) => (
  <>
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        name="filter"
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </label>
  </>
);

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: selectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: e => dispatch(actionsPhonebook.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
