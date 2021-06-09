import routes from '../../routes';
import { Box, Toolbar, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  color: {
    color: 'red',
  },
}));
const AuthNavigation = () => {
  const styless = useStyles();
  return (
    <Toolbar>
      <Box className={styless.margin}>
        <ListItem
          button
          component={NavLink}
          to={routes.login}
          variant="contained"
          size="small"
          color="primary"
          activeClassName={styless.color}
        >
          Login
        </ListItem>
      </Box>
      <ListItem
        button
        component={NavLink}
        to={routes.register}
        variant="contained"
        size="small"
        color="primary"
        activeClassName={styless.color}
      >
        Registration
      </ListItem>
    </Toolbar>
  );
};
export default AuthNavigation;
