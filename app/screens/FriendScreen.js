import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { getFriends, renderUserItem, userItemSeparator } from '../helpers';

import AppBase from '../base_components/AppBase';

class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  };

  fetchFriendData = async () => {
    try {
      const friends = await getFriends(this.props.friendships)
      this.setState({friends: friends});
    } catch (e) {
      console.log(e);
    }
  }
  
  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        this.fetchFriendData()
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { friends } = this.state;
    return (
      <AppBase >
        <FlatList
            data={friends}
            // keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={userItemSeparator}
            renderItem={renderUserItem}
          />
      </AppBase>

    )
  }
}
export default FriendScreen;