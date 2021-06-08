import AuthNavigation from '../AuthNavigation';
import Navigation from '../Navigation';
// import style from './ApplicationBar.module.css';
import UserMenu from '../UserMenu';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as authSelectors from '../../redux/auth/selectors-auth';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ApplicationBar = ({ isAuthenticated }) => {
  const clasess = useStyle();
  return (
    <Toolbar className={clasess.header}>
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNavigation />}
    </Toolbar>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});
export default connect(mapStateToProps)(ApplicationBar);
