import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import BR from '../base_components/BR';
import { convertLocalTime } from '../helpers'
import EventImage from './EventImage';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';

import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../src/graphql/queries";

// Function to convert participant ids into participant usernames using backend query
const convertParticipants = async (userIds) => {
    var outputParticipants = "";
    for (var i = 0; i < userIds.length; i++ ){
        const userData = await API.graphql(graphqlOperation(getUser, { id: userIds[i]}));
        outputParticipants = outputParticipants.concat(userData.data.getUser.username);
        if (i != userIds.length - 1) {
            outputParticipants = outputParticipants.concat(', ')
        }
    }
    return outputParticipants;
};

// Post class, displays event info
class Post extends Component {
    constructor(props) {
        super(props);
        this.profile_pic = props.profile_pic;
        this.event_pic = props.event_pic;
        this.event_name = props.event_name;
        this.start_time = convertLocalTime(props.start_time);
        this.end_time = convertLocalTime(props.end_time);
        this.event_host = props.event_host;
        this.event_participants = props.event_participants;
        this.event_description = props.event_description;
        // this.animation = 0;
        this.state = {
            post_liked: false,
            view_participants: false
        }
    }

    animation = null;

    // Set like button to clicked
    likeToggled(){
        if (!this.state.post_liked) {
            this.animation.play(0, 45);
        }
        else {
            this.animation.play(0, 0);
        }
        this.setState({
            post_liked: !this.state.post_liked
        })
        console.log("status updated");
    }

    // Set participants button to clicked
    participantsToggled(){
        this.setState({
            view_participants: !this.state.view_participants
        })
    }

    // Render the post using arguments passed in via props
    render() {
        //const heartIconColor = (this.state.post_liked) ? this.animation.play(0, 0) : this.animation.play(37, 37);
        return (

            <View style= {{ flex:1, width: 100 + "%", height: 100 + "%"}}>             
                <View style={styles.userBar}>

                    {/* profile pic */}
                    <View>
                    <TouchableOpacity
                        style={{
                            borderColor: this.profile_pic,
                            borderWidth: 3,
                            height: 50,
                            width: 50,
                            marginLeft: 20,
                            marginTop: 25, 
                            borderRadius: 25
                        }}
                    >
                        <LottieView
                        source={changeSVGColor(require("../../assets/8874-cat.json"), this.profile_pic)}
                        />
                    </TouchableOpacity>
                    </View>

                    {/* Username and event name*/}
                    <View>
                        <Text style = {styles.eventName}> {this.event_name} </Text>
                        <Text style = {styles.username}> @{this.event_host} </Text>
                    </View>
                </View>
                <BR size={10}/>
                <View>
                    <Text style = {styles.eventDate}> Start: <Text style = {styles.eventText}> {this.start_time} </Text> </Text>
                    <Text style = {styles.eventData}> End: <Text style = {styles.eventText}>  {this.end_time} </Text> </Text>
                    <Text style = {styles.eventData}> Description: <Text style = {styles.eventText}>  {this.event_description} </Text> </Text>
                </View>

                {/* Event picture */}
                <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <EventImage
                        event = {this.event_pic}
                    />
                </View>
                <View style = {styles.iconBar}>
                    {/* like event */}
                    <TouchableOpacity
                        onPress={() =>{
                            this.likeToggled();
                        }}>
                        <LottieView
                            ref = {animation => {this.animation = animation}}
                            style={styles.heart}
                            source={require("../../assets/heart.json")}
                            autoPlay={false}
                            loop={false}
                        />
                    </TouchableOpacity>
                    {/* view event participants */}
                    <TouchableOpacity
                        onPress={async () =>{
                            const participantUsernames = await convertParticipants(this.event_participants);
                            alert("The participants are: " + participantUsernames);
                        }}>
                        <Image
                            style={styles.participants}
                            source={require('../../assets/user_count.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
      }
    }
    
    // Styles
    const styles = StyleSheet.create({
        tempNav: {
            width: 100 + "%",
            height: 56,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
        },
    
        eventPic: {
            marginTop: 15,
            marginLeft: 20,
            width: 90 + "%",
            height: 300 
        },
    
        eventName: {
            marginLeft: 5,
            marginTop: 25,
            fontFamily: "Futura",
            fontSize: 20,
            color: "orange"
        },
    
        eventDate: {
            marginLeft: 30,
            marginTop: 30,
            fontFamily: "Futura-CondensedExtraBold",
            fontSize: 15
        },

        eventText: {
            fontFamily: "Futura",
        },

            
        eventData: {
            marginLeft: 30,
            marginTop: 2,
            fontFamily: "Futura-CondensedExtraBold",
            fontSize: 15
        },
    
        username: {
            marginLeft: 8,
            marginTop: 5,
            fontFamily: "Futura-MediumItalic",
        },
    
        userBar: {
            width: 100 + "%",
            height: 50,
            flexDirection: "row",
            marginHorizontal: 10
        },
    
        iconBar: {
            height: 47,
            width: 100 + "%",
            borderBottomColor: "black",
            borderBottomWidth: 1,
            flexDirection: "row"
        },
    
        iconPic: {
            height: 33,
            width: 3,
            marginLeft: 50,
            marginBottom: 50
        },
    
        userPic: {
            height: 50,
            width: 50,
            marginLeft: 20,
            marginTop: 25, 
            borderRadius: 25
        },
        heart: {
            marginLeft: 1,
            marginTop: -7,
            height: 75, 
            width: 75,
            //backgroundColor: "blue",
        },
        participants: { 
            marginLeft: 5, 
            height: 33, 
            width: 35
        },
    })

export default Post