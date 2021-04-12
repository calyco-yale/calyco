import { navItem } from '@aws-amplify/ui';
import React, { Component, useState } from 'react';
import { TextInput, StyleSheet, Dimensions, View, Button, FlatList, Modal } from 'react-native';
const { width } = Dimensions.get("window");
import Post from '../components/Post'
import { withNavigation } from 'react-navigation'

// Query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
import { listEvents } from '../../src/graphql/queries'
import { Actions } from 'react-native-router-flux';
import { createEvent, deleteEvent} from '../../src/graphql/custom_mutations';
import { getloggedInUser } from '../helpers';

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
        return <Post
            profile_pic={item.item.user.image_url}
            event_pic={item.item.image_url}
            event_name={item.item.name}
            event_date={item.item.date}
            start_time={item.item.start_time}
            end_time={item.item.end_time}
            location={item.item.location}
            event_host={item.item.user.username}
            event_participants={item.item.participants}
        />;
    }

    createPost = async(loggedInUser, isPublic, image_url, location, end_time, start_time, date, hostName) => {
        try {
            await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: isPublic, image_url: image_url, location: location, end_time: end_time, start_time: start_time, date: date, name: hostName}))
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
            console.log('POST DATA')
            console.log(postData.data.listEvents.items)
            console.log('USER DATA')
            console.log(loggedInUser)
            this.setState({posts: postData.data.listEvents.items, loggedInUser: loggedInUser });
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

  render() {
        const { posts, loggedInUser } = this.state;
        return (
            <View>    
                <View style= {{ marginTop: 30}}>
                    <Button
                        // onPress={() => this.createPost(loggedInUser.id, true,
                        // 'https://cdn2.coachmag.co.uk/sites/coachmag/files/styles/16x9_480/public/2018/05/beginner-gym-routine.jpg?itok=_YxId1cO&timestamp=1526380941'
                        // , 'Payne Whitney Gym', '10:00:00.000', '13:00:00.000', '2021-03-01', 'Workout')}
                        // title='Create Event'
                        onPress={() => Actions.createEventScreen()}
                        // onPress={() => this.deletePost()}
                        title='Create Event'
                    />
                    {/* <Button style= {{ marginTop: 60}} title="Show Modal" onPress={this.toggleModalVisibility} />
                    <Modal animationType="slide" 
                        transparent visible={this.isModalVisible} 
                        presentationStyle="overFullScreen" 
                        onDismiss={this.toggleModalVisibility}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TextInput placeholder="Enter something..." 
                                        value={this.inputValue} style={styles.textInput} 
                                        onChangeText={(value) => this.setInputValue(value)} />
                                <Button title="Close" onPress={this.toggleModalVisibility} />
                            </View>
                        </View>
                    </Modal> */}
                </View>
                <View style= {{ marginTop: 30, marginBottom: 150}}>
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
const styles = StyleSheet.create({
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
        marginTop: 100
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    }
});

export default NewsFeedComponent;