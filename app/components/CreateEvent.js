import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Actions } from "react-native-router-flux";
import { Button, Text, Image, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBase from "../base_components/AppBase";
import PrimaryText from "../base_components/PrimaryText";
import BR from "../base_components/BR";
import TextInput from "../base_components/TextInput";
import RoundButton from "../base_components/RoundButton";
import TextButton from "../base_components/TextButton";
import EventImage from "../components/EventImage";
import { ScrollView } from "react-native-gesture-handler";

import DatePicker from "react-native-datepicker";

import Colors from "../../src/constants/colors";

const createDateTime = () => {
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes();

  var dateTimeString =
    year + "-" + month + "-" + date + " " + hours + ":" + min;
  return dateTimeString;
};

class CreateEventComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      datetime: createDateTime(),
      datetime1: createDateTime()
    };
  }

  pickImage = async () => {
    const { onEventImageChange } = this.props;
    if (Platform.OS !== "web") {
      const {
        status
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });

        if (!result.cancelled) {
          this.setState({ image: result.uri });
          onEventImageChange(result.uri);
        }
      }
    }
  };

  render() {
    const {
      loading,
      registerMessage,
      registerError,
      onEventCreationSubmit,
      onPublicChange,
      onEventNameChange,
      onStartTimeChange,
      onEndTimeChange,
      onEventImageChange,
      disableCreateEvent,
      onDescriptionChange,
      onParticipantsChange,
      user,
      participants
    } = this.props;

    if (registerMessage && registerMessage.success) {
      Actions.replace("loginScreen", {
        loginError: {
          message: "Sign Up successful"
        }
      });
    }

    return (
      <ScrollView>
        <AppBase
          style={{
            justifyContent: "flex-start",
          }}
        >
        <BR size={25} />
        {registerError && <PrimaryText>{registerError.message}</PrimaryText>}
        {registerMessage && <PrimaryText>{JSON.stringify(registerMessage)}</PrimaryText>}
        <BR size={50} />

        <Text style = {styles.Title}>Create Event </Text>

        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onEventNameChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="*Event Name (e.g. birthday)"
        />
        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onPublicChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="*Public (e.g. true/false)"
        />
        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onDescriptionChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="*Description (e.g. alex's bday)"
        />
        <BR />
        <BR>
        <Text>Start Date Time</Text>
        </BR>
        <DatePicker
          style={{width: 300}}
          date={this.state.datetime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(datetime) => {this.setState({datetime: datetime});
            onStartTimeChange(datetime);}}
        />
        <BR></BR>
        <BR>
        <Text>End Date Time</Text>
        </BR>
        <DatePicker
          style={{width: 300}}
          date={this.state.datetime1}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({datetime1: datetime}); onEndTimeChange(datetime);}}
        />
        <BR></BR>
        <Text>Upload Event Image</Text>
        <View style={{ 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center' 
            }}>
            {this.state.image ? 
                <Image 
                source={{ uri: this.state.image }} 
                style={styles.image} 
                onPress={this.pickImage}/> : 
                <TouchableOpacity
                style={styles.selected}
                onPress={this.pickImage}
                >
                <MaterialCommunityIcons name="plus-box" size={80} />
                </TouchableOpacity>
            }
        </View>
        <BR size={200}/>
        <Text style={styles.pText}>
          Participants:
          {participants.map(p =>
            <View style={styles.pView}>
              <Text style={styles.pText}>
                {p.username}
              </Text>
            </View>
          )}
        </Text>
        <RoundButton
          title="Add Participants"
          onPress={() =>
            Actions.addParticipantsScreen({
              loggedInUser: user,
              participants: participants
            })}
        />
        <RoundButton
          title="Create Event"
          disabled={disableCreateEvent}
          loading={loading}
          onPress={onEventCreationSubmit}
          buttonColor="orange"
        />
      </AppBase>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    pView: {
      paddingRight: 5,
      paddingLeft: 5
    },
    pText: {
      fontSize: 20,
      color: Colors.calycoColor
    },
    image: {
        position: 'absolute',
        top: 10,
        left: -150,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: 300,
        height: 170,
        backgroundColor:'#fff',
    },
    selected: {
      position: 'absolute',
      top: 10,
      left: -150,
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 300,
      height: 170,
      backgroundColor:'#fff',
    },
    Title: {
      marginBottom: 10,
      fontFamily: "Futura",
      fontSize: 40,
      color: "orange"
    }
  
});

CreateEventComponent.defaultProps = {
  registerMessage: null,
  registerError: null
};

CreateEventComponent.propTypes = {
  disableCreateEvent: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  registerMessage: PropTypes.object,
  registerError: PropTypes.object,
  onEventCreationSubmit: PropTypes.func.isRequired,
  onPublicChange: PropTypes.func.isRequired,
  onEventNameChange: PropTypes.func.isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  onEventImageChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onParticipantsChange: PropTypes.func.isRequired
};

export default CreateEventComponent;
