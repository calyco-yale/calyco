import { navItem } from '@aws-amplify/ui';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Post from '../components/Post'
import { withNavigation } from 'react-navigation'

// Query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
import { Actions } from 'react-native-router-flux';

class NewsFeedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
    };
    
    _renderPost(item){
        console.log('pain');
        console.log(item)
        return <Post
        profile_pic={'profile_user.png'}
        event_pic={"nuggies.jpeg"}
        event_name={item.item.name}
        event_date={item.item.date}
        event_host={'daniel.li.djl87@yale.edu'}
        event_participants={'Daniel Li, Jinny Choi, Stanley Wong'}
        />;
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
        );
    }
}

export default NewsFeedComponent;