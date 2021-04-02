import React, { Component } from 'react';
import { View, FlatList, Button } from 'react-native';
import { getFriendRequests, createMutualFriendship, userItemSeparator} from '../helpers';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';

import { API, graphqlOperation } from 'aws-amplify';
import { getUserFriendRequests } from '../../src/graphql/custom_queries';
import { deleteFriendRequestById } from '../../src/graphql/custom_mutations';
import { Actions } from 'react-native-router-flux';


class FriendRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequests: []
    }
  };

  fetchRequestData = async () => {
    try {
      const requests = await getFriendRequests(this.props.friendRequests)
      this.setState({friendRequests: requests});
    } catch (e) {
      console.log(e);
    }
  }

  acceptRequest = async(requestId, sender) => {
    try {
      // Create friendships on both sides
      await createMutualFriendship(sender.id, this.props.user.id)
      // Delete friend request
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }))
      const refreshedRequests = await API.graphql(graphqlOperation(getUserFriendRequests, { id: this.props.user.id }))
      this.setState({friendRequests: refreshedRequests});
    } catch (e) {
      console.log(e);
    }
  }

  declineRequest = async(requestId) => {
    try {
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }))
      const refreshedRequests = await API.graphql(graphqlOperation(getUserFriendRequests, { id: this.props.user.id }))
      Actions.refresh({ key: "friendRequestScreen", user: this.props.user, friendRequests: refreshedRequests });
    } catch (e) {
      console.log(e);
    }
  }
  
  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        this.fetchRequestData()
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }


  renderRequestItem(item) {
    const { requestId, sender } = item;
    return(
      <View>
        <PrimaryText size={30}>{sender.username}</PrimaryText>
        <View style={{ flexDirection:"row" }}>
          <View>
            <Button
              onPress={() => this.acceptRequest(requestId, sender)}
              title='Accept'
            />
          </View>
          <View>
          <Button
              onPress={() => this.declineRequest(requestId)}
              title='Decline'
            />
          </View>
        </View>
      </View>
    )
  };


  render() {
    const { friendRequests } = this.state; //Array of form {friendRequestId, Sender user object}
    if (friendRequests.length != 0){
      return (
        <AppBase >
          <FlatList
              data={friendRequests}
              keyExtractor={index => index.toString()}
              ItemSeparatorComponent={userItemSeparator}
              renderItem={({index, item}) => this.renderRequestItem(item)}
            />
        </AppBase>
      )
    } else {
      return(null);
    }
    
  }


}

export default FriendRequestScreen;