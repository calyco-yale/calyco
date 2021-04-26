import React, { Component } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import CreateEventComponent from "../components/CreateEvent";

// query imports
import { API, graphqlOperation } from "aws-amplify";
import { listEventsShortened } from "../../src/graphql/custom_queries";
import { Actions } from "react-native-router-flux";
import { createEvent, deleteEvent, createInvite  } from "../../src/graphql/custom_mutations";
import { getloggedInUser } from "../helpers";
import { getUser } from "../../src/graphql/queries";
import { View, Text, StyleSheet } from "react-native";
import { getUTCTime } from '../helpers'

// Create event screen component which renders create event component
class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_data: null,
      event_pic: null,
      event_name: null,
      start_time: null,
      end_time: null,
      description: null,
      participants: []
    };
  }

  // Call backend to create a post when all parameters are filled in correctly
  createPost = async (
    loggedInUser,
    publicEnabled,
    image_url,
    end_time,
    start_time,
    event_name,
    description,
    participants
  ) => {
    try {
        const event = await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: publicEnabled, image_url: image_url, end_datetime: getUTCTime(end_time), start_datetime: getUTCTime(start_time), name: event_name, description: description, participants: participants}))
        const eventID = event.data.createEvent.id;
        for (let i = 0; i < participants.length; i++){
          await API.graphql(graphqlOperation(createInvite, { userId: participants[i], eventId: eventID, senderId: loggedInUser }))
        }
      } catch (e) {
        console.log(e);
      }
  };

  // Switch to newsfeed once event is created
  handleEventCreationSubmit = async (publicEnabled) => {
    const { user, event_pic, event_name, start_time, end_time, description, participants} = this.state;
    this.createPost(user.id, publicEnabled, event_pic, end_time, start_time, event_name, description, participants.map(p => p.id));
    Actions.newsFeed();
  };

  // Change event name state
  handleEventNameChange = event_name => {
    this.setState({
      event_name
    });
  };

  // Change start time state
  handleStartTimeChange = (start_time) => {
    this.setState({
      start_time
    });
  };

  // Change end time state
  handleEndTimeChange = end_time => {
    this.setState({
      end_time
    });
  };

  // Change participants state
  handleParticipantsChange = participants => {
    this.setState({
      participants
    });
  };

  // Change event image state
  handleEventImageChange = event_pic => {
    this.setState({
      event_pic: event_pic
    });
  };

  // Change event description state
  handleDescriptionChange = description => {
    this.setState({
      description
    });
  };

  // Fetch data from backend on current logged in user and set state
  fetchRequestData = async () => {
    try {
      const user = await getloggedInUser();
      const loggedInUserData = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      this.setState({ user: user, userData: loggedInUserData });
    } catch (e) {
      console.log(e);
    }
  }

    // Function called in the beginning to request logged in user data before componenet rendered
  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchRequestData();
      }
    );
  };

  // Function to remove listener
  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  // Render create event object
  render() {
    const { registerLoading, registerError, registerMessage } = this.props;
    const {
      user,
      start_time,
      end_time,
      description,
    } = this.state;

    // Disable create event button if fields are null
    const disableCreateEvent =
      !start_time || !end_time || !description;

    // Call create event component and return the user input when values are changed
    if (user) {
      return (
        <CreateEventComponent
          loading={registerLoading}
          registerMessage={registerMessage}
          registerError={registerError}
          disableCreateEvent={disableCreateEvent}
          onEventCreationSubmit={this.handleEventCreationSubmit}
          onEventNameChange={this.handleEventNameChange}
          onStartTimeChange={this.handleStartTimeChange}
          onEndTimeChange={this.handleEndTimeChange}
          onEventImageChange={this.handleEventImageChange}
          onParticipantsChange={this.handleParticipantsChange}
          onDescriptionChange={this.handleDescriptionChange}
          user={this.state.user}
          participants={this.state.participants}
        />
      );
    } else {
      return (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
  }
}

CreateEventScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false
};

CreateEventScreen.propTypes = {
  registerMessage: PropTypes.object,
  registerLoading: PropTypes.bool,
  registerError: PropTypes.object
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    textAlign: "center"
  },
  loadingText: {
    fontSize: 30
  }
});

export default CreateEventScreen;
