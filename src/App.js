import 'modern-normalize/modern-normalize.css';
import { Switch, Route } from 'react-router-dom';
import ApplicationBar from './components/ApplicationBar';
// import HomeView from './views/HomeView';
// import RegisterView from './views/RegisterView';
// import LoginView from './views/LoginView';
// import ContactsView from './views/ContactsView';
import { AppBar, Container } from '@material-ui/core';
// import { setState, useEffect } from 'react';
// import { render } from '@testing-library/react';
import { Component, Suspense, lazy } from 'react';
import * as authOperations from './redux/auth/operations-auth';
import { connect } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() =>
  import('./views/HomeView' /*webpackChunkName: "HomeView" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /*webpackChunkName: "LoginView" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /*webpackChunkName: "RegisterView" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /*webpackChunkName: "ContactsView" */),
);

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <>
        <AppBar position="relative">
          <Container fixed>
            {/* <Toolbar> */}
            <ApplicationBar />
            {/* </Toolbar> */}
          </Container>
        </AppBar>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <PublicRoute
              path="/register"
              component={RegisterView}
              restricted
              redirectTo={'/contacts'}
            />
            <PublicRoute
              path="/login"
              restricted
              component={LoginView}
              redirectTo={'/contacts'}
            />
            <PrivateRoute
              path="/contacts"
              component={ContactsView}
              redirectTo="/login"
            />
          </Switch>
        </Suspense>
      </>
    );
  }
}
const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};
export default connect(null, mapDispatchToProps)(App);
