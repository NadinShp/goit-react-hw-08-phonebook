import { connect } from 'react-redux';
import * as authOperations from '../../redux/auth/operations-auth';

import { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    left: '40%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
}));

const LoginView = ({ prop, onLogin }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange =
    prop =>
    ({ target: { value } }) => {
      setValues({ ...values, [prop]: value });
    };
  const handleSubmit = e => {
    e.preventDefault();
    onLogin(values);
  };
  const styless = useStyles();
  return (
    <Container>
      <form onSubmit={handleSubmit} className={styless.form}>
        <TextField
          onChange={handleChange('email')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={values.email}
        />
        <TextField
          onChange={handleChange('password')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          // autoComplete="current-password"
          value={values.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styless.btn}
        >
          {' '}
          Log in
        </Button>
      </form>
    </Container>
  );
};
const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(authOperations.logIn(data)),
});
export default connect(null, mapDispatchToProps)(LoginView);
