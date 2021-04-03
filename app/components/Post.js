import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Actions } from 'react-native-router-flux';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';
import { configure } from '@react-native-community/netinfo';

class Post extends Component {
    constructor(props) {
        super(props);
        // "../../assets/" + props.profile_pic);
        this.profile_pic = "../../assets/" + props.profile_pic;
        this.event_pic = "../../assets/" + props.event_pic;
        this.event_name = props.event_name;
        this.event_date = props.event_date;
        this.event_host = props.event_host;
        this.event_participants = props.event_participants;
        this.state = {
            post_liked: false,
            view_participants: false
        }
    }

    likeToggled(){
        this.setState({
            post_liked: !this.state.post_liked
        })
    }

    participantsToggled(){
        this.setState({
            view_participants: !this.state.view_participants
        })
    }

    render() {

        const heartIconColor = (this.state.post_liked) ? "rgb(252,61,57)" : null;
        return (

            <View style= {{ flex:1, width: 100 + "%", height: 100 + "%"}}>             
                <View style={styles.userBar}>

                    {/* profile pic */}
                    <View>
                        <Image
                            style={styles.userPic}
                            source={require('../../assets/profile_user.png')}
                        />
                    </View>

                    {/* Username and event name*/}
                    <View>
                        <Text style = {styles.eventName}> {this.event_name} </Text>
                            <Text style = {styles.username}> {this.event_host} </Text>
                    </View>
                </View>

                <View>
                    <Text style = {styles.eventTime}> {this.event_date} </Text>
                </View>

                {/* Event picture */}
                <Image
                    style={styles.eventPic}
                    source={require('../../assets/nuggies.jpeg')}
                />
                <View style = {styles.iconBar}>
                    {/* like event */}
                    <TouchableOpacity
                        onPress={() =>{
                            this.likeToggled();
                        }}>
                        <Image
                            style={styles.iconPic, {tintColor: heartIconColor}}
                            source={require('../../assets/heart_button.png')}
                        />
                    </TouchableOpacity>
                    {/* view event event_participants */}
                    <TouchableOpacity
                        onPress={() =>{
                            alert("The participants are: " + this.event_participants);
                        }}>
                        <Image
                            style={styles.iconPic}
                            source={require('../../assets/user_count.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
        tempNav: {
            width: 100 + "%",
            height: 56,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center"
        },
    
        eventPic: {
            marginTop: 15,
            marginLeft: 20,
            width: 40 + "%",
            height: 300 
        },
    
        eventName: {
            marginLeft: 10,
            marginTop: 30  
        },
    
        eventTime: {
            marginLeft: 20,
            marginTop: 30
        },
    
        username: {
            marginLeft: 10,
            marginTop: 5
        },
    
        userBar: {
            width: 100 + "%",
            height: 50,
            flexDirection: "row",
            marginHorizontal: 10
        },
    
        iconBar: {
            height: 50,
            width: 90 + "%",
            marginLeft: 20,
            borderBottomColor: "rgb(233,233,233)",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            flexDirection: "row"
        },
    
        iconPic: {
            height: 50,
            width: 50
        },
    
        userPic: {
            height: 50,
            width: 50,
            marginLeft: 20,
            marginTop: 25, 
            borderRadius: 25
        }
    })

export default Post