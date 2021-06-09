import PropTypes from 'prop-types';
import { List, ListItem, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrap: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '400px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const Contacts = ({ contacts, onDeleteContact }) => {
  const styless = useStyles();
  return (
    <List className={styless.wrap}>
      {contacts &&
        contacts.map(({ id, name, number }) => (
          <ListItem key={id} className={styless.item}>
            <Typography>
              {name}: {number}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => onDeleteContact(id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};

export default Contacts;
