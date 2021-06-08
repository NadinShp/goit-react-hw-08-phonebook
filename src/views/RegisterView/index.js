import { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as authOperations from '../../redux/auth/operations-auth';

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
    left: '35%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
}));

const RegisterView = ({ prop, onRegister }) => {
  const [values, setValues] = useState({
    name: '',
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
    onRegister(values);
  };
  const styless = useStyles();
  return (
    <Container>
      <form onSubmit={handleSubmit} className={styless.form}>
        <TextField
          onChange={handleChange('name')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={values.name}
        />
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
          value={values.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styless.btn}
        >
          {' '}
          Registration
        </Button>
      </form>
    </Container>
  );
};

// const mapDispatchToProps = {
//   onRegister: authOperations.register,
// };
const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(authOperations.register(data)),
});
export default connect(null, mapDispatchToProps)(RegisterView);
