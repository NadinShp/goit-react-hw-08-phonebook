import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as actionsPhonebook from '../../redux/phonebook/actions-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    width: '100%',
    margin: 'auto',
  },
}));
const Filter = ({ value, onChangeFilter }) => {
  const styless = useStyles();
  return (
    <>
      <TextField
        className={styless.input}
        variant="outlined"
        margin="normal"
        id="name"
        label="Find contacts by name"
        name="filter"
        autoFocus
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </>
  );
};

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
