/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import LoginComponent from '../components/Login';
import { Auth } from 'aws-amplify';
import { retrieveOffset } from '../helpers'

class LoginScreen extends Component {
  displayName = 'LoginScreen';

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  componentDidMount() {
    const { loginMessage } = this.props;
    if (loginMessage !== null && loginMessage.token && loginMessage.token.length > 10) {
      Actions.reset('drawer');
    }
  }

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    try {
        const user = await Auth.signIn(email, password);
        const offset = retrieveOffset();
        console.log(offset);
        Actions.newsFeed();
    } catch (error) {
        console.log('error signing in', error);
        // Display some visible error otherwise!
    }
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  handleRedirect = (loginMessage) => {
    if (loginMessage && loginMessage.token) {
      try {
        Actions.reset('drawer');
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    const { loginLoading, loginMessage } = this.props;
    if (loginMessage && loginLoading.token) {
      return null;
    }

    let { loginError } = this.props;

    const { email, password } = this.state;

    // eslint-disable-next-line react/prop-types
    loginError = loginError || this.props.navigation.state.params.loginError;

    const disableLogin = (!email || email.length === 0 || !password || password.length === 0);

    return (
      <LoginComponent
        loading={loginLoading}
        loginError={loginError}
        disableLogin={disableLogin}
        onLoginSubmit={this.handleLoginSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />);
  }
}

LoginScreen.defaultProps = {
  loginError: null,
  loginMessage: null,
};

LoginScreen.propTypes = {
  loginError: PropTypes.object,
  loginMessage: PropTypes.object,
};

export default LoginScreen;
