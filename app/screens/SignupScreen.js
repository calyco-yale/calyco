import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import SignupComponent from '../components/Signup';
import { API, graphqlOperation } from 'aws-amplify';
import { createUser } from '../../src/graphql/mutations';
import { Actions } from 'react-native-router-flux';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      username: null,
      first_name: null,
      last_name: null,
      confirm_password: null
    };
  }

  handleSignUpSubmit = async () => {
    const { email, password, username, first_name, last_name, confirm_password } = this.state;

    // Register through AWS Auth API
    try {
        const name = first_name.trim() + ' ' + last_name.trim();
        const { user } = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
              name: name
            }
        });
        if (user){
          // Add new user to GraphQL database
          const userData = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            image_url: "#54d05d"
          };
          const response = await API.graphql(graphqlOperation(createUser, {input: userData}));
        }
        Actions.verificationScreen({email: email});
    } catch (error) {
        console.log('error signing up:', error);
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

  handleUsernameChange = (username) => {
    this.setState({
      username,
    });
  };

  handleFirstNameChange = (first_name) => {
    this.setState({
      first_name,
    });
  };

  handleLastNameChange = (last_name) => {
    this.setState({
      last_name,
    });
  };

  handleConfirmPasswordChange = (confirm_password) => {
    this.setState({
      confirm_password,
    });
  };

  render() {
    const { registerLoading, registerError, registerMessage } = this.props;
    const { email, password, username, first_name, last_name, confirm_password } = this.state;
    const disableSignUp = (!email || email.length === 0 || 
      !password || password.length === 0 || 
      !username || username.length === 0 || 
      !first_name || first_name.length === 0 || 
      !last_name || last_name.length === 0 ||
      !confirm_password || confirm_password.length === 0 || password != confirm_password);
    //add some visual indicator for mismatched passwords

    return (
      <SignupComponent
        loading={registerLoading}
        registerMessage={registerMessage}
        registerError={registerError}
        disableSignUp={disableSignUp}
        onSignupSubmit={this.handleSignUpSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onUsernameChange={this.handleUsernameChange}
        onFirstNameChange={this.handleFirstNameChange}
        onLastNameChange={this.handleLastNameChange}
        onConfirmPasswordChange={this.handleConfirmPasswordChange}
      />);
  }
}

SignupScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false,
};

SignupScreen.propTypes = {
  registerMessage: PropTypes.object,
  registerLoading: PropTypes.bool,
  registerError: PropTypes.object,
  authRegister: PropTypes.func.isRequired,
};

export default SignupScreen;