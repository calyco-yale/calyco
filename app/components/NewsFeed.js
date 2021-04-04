import { navItem } from '@aws-amplify/ui';
import React, { Component } from 'react';
import { View, Button, FlatList } from 'react-native';
import Post from '../components/Post'
import { withNavigation } from 'react-navigation'

// Query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
import { Actions } from 'react-native-router-flux';
import { createEvent } from '../../src/graphql/custom_mutations';

class NewsFeedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
    };
    
    _renderPost(item){
        console.log('PAIN');
        console.log(item)
        return <Post
        profile_pic={'profile_user.png'}
        event_pic={"nuggies.jpeg"}
        event_name={item.item.name}
        event_date={item.item.date}
        start_time={item.item.start_time}
        end_time={item.item.end_time}
        location={item.item.location}
        event_host={'daniel.li.djl87@yale.edu'}
        event_participants={'Daniel Li, Jinny Choi, Stanley Wong'}
        />;
    }

    createPost = async(loggedInUser, isPublic, image_url, location, end_time, start_time, date, hostName) => {
        try {
            await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: isPublic, image_url: image_url, location: location, end_time: end_time, start_time: start_time, date: date, name: hostName}))
          } catch (e) {
            console.log(e);
          }
    }

    fetchRequestData = async () => {
        try {
            const postData = await API.graphql(graphqlOperation(listEventsShortened))
            console.log('POST DATA')
            console.log(postData.data.listEvents.items)
            this.setState({posts: postData.data.listEvents.items});
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
        const { posts } = this.state;
        return (
            <View>    
                <View style= {{ marginTop: 30}}>
                    <Button
                        onPress={() => this.createPost(1, true,
                        'https://i0.wp.com/zamzows.com/wp-content/uploads/2015/11/chinchilla.jpg?resize=1080%2C675&ssl=1'
                        , 'Hell', '10:00 PM', '11:00 AM', '10/04/2000', 'chinchillin')}
                        title='Create Event'
                    />
                </View>
                <View style= {{ marginTop: 30}}>
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