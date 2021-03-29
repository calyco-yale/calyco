import { navItem } from '@aws-amplify/ui';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Post from '../components/Post'

class NewsFeedComponent extends Component {
    _renderPost(item){
        // console.log(item.item.profile_pic);
        return <Post
        profile_pic={item.item.profile_pic}
        event_pic={item.item.event_pic}
        event_name={item.item.event_name}
        event_date={item.item.event_date}
        event_host={item.item.event_host}
        event_participants={item.item.event_participants}
        />;
    }

  render() {
        return (
            <FlatList
                data = {[
                    {
                        id: "0",
                        profile_pic: "profile_user.png",
                        event_pic: "nuggies.jpeg",
                        event_name: "CHICKEN NUGGET PARTY",
                        event_date: "03/27/2021 3:00 - 6:00 PM",
                        event_host: "@daniel.li.djl87@yale.edu",
                        event_participants: "Daniel Li, Jinny Choi, Stanley Wong"
                    }
                ]}
                keyExtractor={(item) => item.id}
                renderItem={(item) => this._renderPost(item)}
            />
        );
    }
}

export default NewsFeedComponent;