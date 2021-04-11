import { navItem } from '@aws-amplify/ui';
import React, { Component } from 'react';
import { View, Button, FlatList } from 'react-native';
import Post from '../components/Post'
import { withNavigation } from 'react-navigation'

// Query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
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
    
    _renderPost(item){
        return <Post
        profile_pic={'profile_user.png'}
        event_pic={item.item.image_url}
        event_name={item.item.name}
        event_date={item.item.date}
        start_time={item.item.start_time}
        end_time={item.item.end_time}
        location={item.item.location}
        event_host={'daniel.li.djl87@yale.edu'}
        event_participants={'Daniel Li'}
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
            await API.graphql(graphqlOperation(deleteEvent, { id: '73b7ddd4-9c3e-4708-9889-c79437fed1ce' }))
        } catch (e) {
            console.log(e);
        }
    }

    fetchRequestData = async () => {
        try {
            const loggedInUser = await getloggedInUser()
            const postData = await API.graphql(graphqlOperation(listEventsShortened))
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
                        onPress={() => this.createPost(loggedInUser.id, true,
                        'https://www.parentskills.com.au/sites/default/files/styles/large/public/Disappointed.jpg?itok=9Vh4RPn8'
                        , 'Home', '12:44:00.000', '01:00:00.000', '2021-01-01', 'Disappointing my parents....')}
                        title='Create Event'
                        // onPress={() => this.deletePost()}
                        // title='Create Event'
                    />
                </View>
                <View style= {{ marginTop: 30, marginBottom: 150}}>
                    <FlatList
                        data = {posts}
                        // data = {[
                        //     {
                        //         id: "0",
                        //         profile_pic: "profile_user.png",
                        //         event_pic: "nuggies.jpeg",
                        //         event_name: "CHICKEN NUGGET PARTY",
                        //         event_date: "03/27/2021 3:00 - 6:00 PM",
                        //         event_host: "@daniel.li.djl87@yale.edu",
                        //         event_participants: "Daniel Li, Jinny Choi, Stanley Wong"
                        //     }
                        // ]}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => this._renderPost(item)}
                    />
                </View>
            </View>
        );
    }
}

export default NewsFeedComponent;