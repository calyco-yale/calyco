import React, { Component, useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import Colors from '../../src/constants/colors';

import AppBase from '../base_components/AppBase';
import UserComponent from '../components/User'

class FriendScreen extends Component {
  constructor(props) {
    super(props);
  };

  _renderItem = ({ item }) => (
    <UserComponent key={item.id} userItem={item} />
  );

  _itemSeparator = () => {
    return (
      <AppBase
        style={{
          height: 10,
          width: '100%',
        }}
      />
    );
  };

  render() {
    return (
      <AppBase >
        <FlatList
            data={this.props.friends}
            // keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this._itemSeparator}
            renderItem={this._renderItem}
          />
      </AppBase>

    )
  }



}
export default FriendScreen;