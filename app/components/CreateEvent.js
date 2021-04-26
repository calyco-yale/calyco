import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Actions } from "react-native-router-flux";
import { Text, View, StyleSheet, Switch } from "react-native";

import AppBase from "../base_components/AppBase";
import PrimaryText from "../base_components/PrimaryText";
import BR from "../base_components/BR";
import TextInput from "../base_components/TextInput";
import RoundButton from "../base_components/RoundButton";
import EventImage from "../components/EventImage";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../../src/constants/colors";
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import { getUTCTime, convertLocalTime, suggestTimes } from "../helpers";

const createDateTime = () => {
  var date = ('0' + new Date().getDate()).slice(-2)
  var month = ('0' + (new Date().getMonth()+1)).slice(-2)
  var year = new Date().getFullYear();
  var hours = ('0' + new Date().getHours()).slice(-2)
  var min = ('0' + new Date().getMinutes()).slice(-2)


  var dateTimeString =
    year + "-" + month + "-" + date + " " + hours + ":" + min;
  return dateTimeString;
};

class CreateEventComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      eventType: null,
      privateEnabled: false,
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

  toggleSwitch = () => {
    this.setState({ privateEnabled: !this.state.privateEnabled})
  }

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

    let privateEnabled = this.state.privateEnabled

    if (registerMessage && registerMessage.success) {
      Actions.replace("loginScreen", {
        loginError: {
          message: "Sign Up successful"
        }
      });
    }

    let suggestedTimes = null;
    let addParticipants = null;
    if (participants && participants.length > 0){
      suggestedTimes = <View style={styles.center}>
         <Text style={styles.pTextBold}>Common Free Times for Participants:</Text>
         <Text>
           {suggestTimes(participants.concat(user), getUTCTime(this.state.datetime), getUTCTime(this.state.datetime1)).map(timeInterval =>
            <View style={styles.pView}>
              <Text style={styles.pText}>
                {convertLocalTime(timeInterval[0])} ~ {convertLocalTime(timeInterval[1])}
              </Text>
            </View>)}
          </Text>
        </View>

      addParticipants = <Text style={styles.pTextBold}>
      Participants:
      {participants.map(p =>
        <View style={styles.pView}>
          <Text style={styles.pText}>
            {p.username}
          </Text>
        </View>
      )}
      </Text>
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
          onChangeText={debounce(onDescriptionChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="*Description (e.g. alex's bday)"
        />
        <BR/>

        <View style={styles.container}>
          <Text>
            <View style={styles.padded}><Text style = {styles.graytext}>Private Event?</Text></View>
            <Switch
              trackColor={{ false: "#767577", true: Colors.calycoColor  }}
              thumbColor={privateEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSwitch}
              value={privateEnabled}
            />
          </Text>
        </View>

        <BR/>
        <BR/>
        <View style = {styles.center}>
          <Text>Start Date Time</Text>
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
        </View>
        <BR/>
        {suggestedTimes}
        <BR></BR>
        <Text>Select Event Type</Text>
        {/* exercise, rest, study, party, meeting, meal, other */}
        <DropDownPicker
            items={[
                {label: 'exercise', value: 'exercise', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'rest', value: 'rest', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'study', value: 'study', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'party', value: 'party', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'meeting', value: 'meeting', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'meal', value: 'meal', icon: () => <Icon name="plus-square" size={18} color="#900" />},
                {label: 'other', value: 'other', icon: () => <Icon name="plus-square" size={18} color="#900" />},
            ]}
            defaultValue={this.state.country}
            containerStyle={{height: 70, width: 350}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => {this.setState({ eventType: item.value });
              // if (this.state.eventType.localeCompare('exercise')) {
              //   onEventImageChange();
              // } else if (this.state.eventType.localeCompare('rest')) {
              //   onEventImageChange();
              // } else if (this.state.eventType.localeCompare('study')) {
              //   onEventImageChange();
              // } else if (this.state.eventType.localeCompare('party')) {
              //   onEventImageChange();
              // } else if (this.state.eventType.localeCompare('meeting')) {
              //   onEventImageChange();
              // } else if (this.state.eventType.localeCompare('meal')) {
              //   onEventImageChange();
              // } else {
              //   onEventImageChange();
              // }
            }}
        />
        <BR size={200}/>

        {addParticipants}

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
          onPress={() => onEventCreationSubmit(!privateEnabled)}
          buttonColor="orange"
        />
      </AppBase>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    graytext: {
      color: Colors.slateGrey,
      fontSize: 17
    },
    padded: {
      paddingRight: 20,
    },
    switch: {
      paddingRight: 5,
      paddingLeft: 5
    },
    center: {
      alignItems: 'center'
    },
    pView: {
      paddingRight: 5,
      paddingLeft: 5
    },
    pText: {
      fontSize: 20,
      color: Colors.calycoColor
    },
    pTextBold: {
      fontSize: 20,
      color: Colors.calycoColor,
      fontWeight: "bold"
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
