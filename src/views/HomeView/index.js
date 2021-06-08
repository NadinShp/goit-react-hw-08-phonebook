import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150px',
  },
}));

const HomeView = () => {
  const styless = useStyles();
  return (
    <Container>
      <Typography className={styless.text} variant="h2">
        Welcome to the phonebook service
      </Typography>
    </Container>
  );
};

export default HomeView;
