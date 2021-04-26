/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import AppBase from '../base_components/AppBase';
import SecondaryText from '../base_components/SecondaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';

// Component for rendering the verification screen after sign up

class VerificationComponent extends Component {
  render() {
    const {
      onCodeChange, onCodeSubmit, onResend, disableSubmit,
    } = this.props;

    return (
      <AppBase
        style={{
          justifyContent: 'center',
        }}
      >
        <SecondaryText size={30}>    Verify your account</SecondaryText>
        <BR size={35} />
        
        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onCodeChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="6-Digit Code"
        />
        <BR />
        <SecondaryText size={'15px'}>       A code was sent to your email. Don't see it?</SecondaryText>
        <TextButton
          onPress={onResend}
          title="Resend it"
          style={{color: '#429ef5'}}
        />
        <BR />
        <RoundButton
          title="Submit"
          disabled={disableSubmit}
          onPress={onCodeSubmit}
        />
      </AppBase>
    );
  }
}

VerificationComponent.defaultProps = {
  email: null,
};

export default VerificationComponent;
