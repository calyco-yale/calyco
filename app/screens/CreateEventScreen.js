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

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_data: null,
      is_public: null,
      event_pic: null,
      event_name: null,
      start_time: null,
      end_time: null,
      description: null,
      participants: []
    };
  }

  createPost = async (
    loggedInUser,
    is_public,
    image_url,
    end_time,
    start_time,
    event_name,
    description,
    participants
  ) => {
    try {
        const event = await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: is_public, image_url: image_url, end_datetime: end_time, start_datetime: start_time, name: event_name, description: description, participants: participants}))
        const eventID = event.data.createEvent.id;
        for (let i = 0; i < participants.length; i++){
          await API.graphql(graphqlOperation(createInvite, { userId: participants[i], eventId: eventID, senderId: loggedInUser }))
        }
      } catch (e) {
        console.log(e);
      }
  };

  handleEventCreationSubmit = async () => {
    const { user, is_public, event_pic, event_name, start_time, end_time, description, participants} = this.state;
    this.createPost(user.id, is_public, event_pic, end_time, start_time, event_name, description, participants.map(p => p.id));
    Actions.newsFeed();
  };

  handleEventNameChange = event_name => {
    this.setState({
      event_name
    });
  };

  handlePublicChange = is_public => {
    this.setState({
      is_public
    });
  };

  handleStartTimeChange = (start_time) => {
    this.setState({
      start_time
    });
  };

  handleEndTimeChange = end_time => {
    this.setState({
      end_time
    });
  };

  handleParticipantsChange = participants => {
    this.setState({
      participants
    });
  };

  handleEventImageChange = event_pic => {
    this.setState({
      event_pic
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description
    });
  };

  fetchRequestData = async () => {
    try {
      const user = await getloggedInUser();
      const loggedInUserData = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      this.setState({ user: user, userData: loggedInUserData });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchRequestData();
      }
    );
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { registerLoading, registerError, registerMessage } = this.props;
    // add error checking to parameters
    const {
      user,
      user_data,
      is_public,
      event_pic,
      start_time,
      end_time,
      description,
      participants
    } = this.state;
    const disableCreateEvent =
      !is_public || !start_time || !end_time || !description;
    if (user) {
      return (
        <CreateEventComponent
          loading={registerLoading}
          registerMessage={registerMessage}
          registerError={registerError}
          disableCreateEvent={disableCreateEvent}
          onEventCreationSubmit={this.handleEventCreationSubmit}
          onPublicChange={this.handlePublicChange}
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

// export default connect(initMapStateToProps, initMapDispatchToProps)(SignupScreen);
export default CreateEventScreen;
