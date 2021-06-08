import { Toolbar, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import { connect } from 'react-redux';
import * as authSelectors from '../../redux/auth/selectors-auth';
import * as authOperations from '../../redux/auth/operations-auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  color: {
    color: 'red',
  },
}));

const UserMenu = ({ name, onLogout }) => {
  const styless = useStyles();
  return (
    <Toolbar>
      <ListItem>
        <span>Welcome, {name}</span>
      </ListItem>
      <ListItem
        button
        component={NavLink}
        to={routes.login}
        onClick={onLogout}
        size="medium"
        variant="outlined"
        color="primary"
        activeClassName={styless.color}
      >
        Logout
      </ListItem>
    </Toolbar>
  );
};
const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
});
const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
