/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Actions } from "react-native-router-flux";

import AppBase from "../base_components/AppBase";
import PrimaryText from "../base_components/PrimaryText";
import SecondaryText from "../base_components/SecondaryText";
import BR from "../base_components/BR";
import TextInput from "../base_components/TextInput";
import RoundButton from "../base_components/RoundButton";
import TextButton from "../base_components/TextButton";
import Colors from "../../src/constants/colors";
import { View, Image } from "react-native";

class LoginComponent extends Component {
  render() {
    const {
      loading,
      onLoginSubmit,
      onEmailChange,
      onPasswordChange,
      loginError,
      disableLogin
    } = this.props;

    return (
      <AppBase
        style={{
          justifyContent: "center"
        }}
      >
        <BR size={30} />
        <Image
          source={require("../../assets/serious_calyco.png")}
          style={{ width: 200, height: 230 }}
        />
        <BR size={20} />
        {loginError &&
          <PrimaryText>
            {loginError.message}
          </PrimaryText>}
        <BR size={50} />

        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onEmailChange, 500)}
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="Email Address"
        />
        <BR />
        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onPasswordChange, 500)}
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          underlineColorAndroid="#B9B9B9"
          secureTextEntry
          placeholder="Password"
        />
        <BR />
        <TextButton onPress={() => {}} title="Forgot Password?" />
        <BR />
        <RoundButton
          title="Sign In"
          disabled={disableLogin}
          loading={loading}
          onPress={onLoginSubmit}
        />
        <BR size={10} />
        <RoundButton
          primary
          buttonColor="#f4a95d"
          title="Create Account"
          onPress={() => Actions.signupScreen()}
        />
        <BR size={20} />
      </AppBase>
    );
  }
}

LoginComponent.defaultProps = {
  loginError: null
};

LoginComponent.propTypes = {
  disableLogin: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired
};

export default LoginComponent;
