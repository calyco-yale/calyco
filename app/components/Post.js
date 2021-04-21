import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import BR from '../base_components/BR';
import { convertLocalTime } from '../helpers'
import EventImage from './EventImage';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';

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
                        <Image
                            style={styles.iconPic, {tintColor: heartIconColor}}
                            source={require('../../assets/heart_button.png')}
                        />
                    </TouchableOpacity>
                    {/* view event participants */}
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