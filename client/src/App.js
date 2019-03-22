import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentCompany } from './actions/companyActions';
import { clearCurrentFulfiller } from './actions/fulfillerActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/Navbar/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Landing from './components/layout/Landing/Landing';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditCompany from './components/edit-company/EditCompany';
import CreateCompany from './components/create-company/CreateCompany';
import AddProduct from './components/add-products/AddProduct';
import CreateFulfiller from './components/create-fulfiller/CreateFulfiller';
import EditFulfiller from './components/edit-fulfiller/EditFulfiller';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentCompany());
    // Clear current Fulfiller
    store.dispatch(clearCurrentFulfiller());
    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    let sideDrawer;
    let backdrop;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <Provider store={ store }>
        <Router>
          <div style={{height: '100%'}}>
            <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
            {sideDrawer}
            {backdrop}
            <main style={{marginTop: '64px'}}>
              <Route exact path="/" component={ Landing } />
              <div className="container">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-company" component={ CreateCompany } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-company" component={ EditCompany } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-product" component={ AddProduct } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-fulfiller" component={ CreateFulfiller } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-fulfiller" component={ EditFulfiller } />
                </Switch>
              </div>
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
