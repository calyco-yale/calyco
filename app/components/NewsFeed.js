import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import Post from '../components/Post'
import RoundButton from '../base_components/RoundButton';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents, getUser } from '../../src/graphql/queries'
import { Actions } from 'react-native-router-flux';
import { createEvent, deleteEvent} from '../../src/graphql/custom_mutations';
import { updateUser } from '../../src/graphql/mutations';
import { getloggedInUser } from '../helpers';

const { width } = Dimensions.get("window");

class NewsFeedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loggedInUser: null
        }
    };
      
    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    toggleModalVisibility = () => {
        this.isModalVisible = !this.isModalVisible;
    };
    
    _renderPost(item){
        if (item.item.public) {
            return <Post
            profile_pic={item.item.user.image_url}
            event_pic={item.item.image_url}
            event_name={item.item.name}
            start_time={item.item.start_datetime}
            end_time={item.item.end_datetime}
            event_host={item.item.user.username}
            event_participants={item.item.participants}
        />;
        }
    }

    createPost = async(loggedInUser, isPublic, image_url, end_datetime, start_datetime, hostName) => {
        try {
            await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: isPublic, image_url: image_url, end_datetime: end_datetime, start_datetime: start_datetime, name: hostName}))
          } catch (e) {
            console.log(e);
          }
    }


    deletePost = async() => {
        try {
            await API.graphql(graphqlOperation(deleteEvent, { id: 'c14db569-952d-492d-ac1b-f5685526f303' }))
        } catch (e) {
            console.log(e);
        }
    }

    fetchRequestData = async () => {
        try {
            const loggedInUser = await getloggedInUser()
            const postData = await API.graphql(graphqlOperation(listEvents))
            this.setState({posts: postData.data.listEvents.items, loggedInUser: loggedInUser });
        } catch (e) {
            console.log(e);
        }
    }

    registerForPushNotificationsAsync = async () => {
        const loggedInUser = await getloggedInUser();
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to enable push notifications. Check that notifications are enabled in device settings!');
                return;
            }

            // Add pushToken to backend
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            const userData = {
                id: loggedInUser.id,
                pushToken: token,
            };
            await API.graphql(graphqlOperation(updateUser, {input: userData}));
            } else {
                console.log('Must use physical device for Push Notifications');
            }
        
            if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
            }        
    };

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

  render() {
        const { posts } = this.state;
        this.registerForPushNotificationsAsync();
        return (
            <View>    
                <View style= {{ marginTop: 50}}>
                    <RoundButton
                        onPress={() => Actions.createEventScreen()}
                        buttonColor='grey'
                        title='Create Event'
                    />
                </View>
                <View style= {{ marginTop: 10, marginBottom: 275}}>
                    <FlatList
                        data = {posts}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => this._renderPost(item)}
                    />
                </View>
            </View>
        );
    }
}

export default NewsFeedComponent;