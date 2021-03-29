/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import VerificationComponent from '../components/Verification';
import { Auth } from 'aws-amplify';

class VerificationScreen extends Component {
  displayName = 'VerificationScreen';

  constructor(props) {
    super(props);
    this.state = {
      code: null
    };
  }

  handleSubmit = async () => {
    const { code } = this.state;
    console.log('Checking code...');
    try {
        await Auth.confirmSignUp(this.props.email, code);
        Actions.loginScreen();
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  };

  handleCodeChange = (code) => {
    this.setState({
      code,
    });
  };

  render() {
    const { code } = this.state;

    const disableSubmit = (!code || code.length != 6);

    return (
      <VerificationComponent
        onCodeChange={this.handleCodeChange}
        onCodeSubmit={this.handleSubmit}
        disableSubmit={disableSubmit}
      />);
  }
}

VerificationScreen.defaultProps = {
  email: null,
};

export default VerificationScreen;
