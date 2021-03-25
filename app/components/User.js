import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import TextButton from '../base_components/TextButton';
import { Actions } from 'react-native-router-flux';

class UserComponent extends Component {
  render() {
    const {userItem} = this.props;
    return (
      <TextButton
          onPress={() => Actions.userProfileScreen({userId: userItem.id})}
          // title={[userItem.first_name, userItem.last_name].join(' ')}
          title={userItem.username}
        />
    );
  }
};

export default UserComponent;