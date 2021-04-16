import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import CreateEventComponent from '../components/CreateEvent';

// query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
import { listUsersShortened } from '../../src/graphql/custom_queries';
import { Actions } from 'react-native-router-flux';
import { createEvent, deleteEvent} from '../../src/graphql/custom_mutations';
import { getloggedInUser } from '../helpers';
import { getUser } from '../../src/graphql/queries';
import {renderUserItem, userItemSeparator} from '../helpers';


class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // host object, pass in username, profile picture into the create event component
        all_usernames: [],
        user: null,
        user_data: null,
        is_public: null,
        event_pic: null,
        event_name: null,
        event_date: null,
        start_time: null,
        end_time: null,
        location: null,
        description: null,
        // Might have this as list of objects or just strings, not sure yet
        participants: null
    };
  }

  createPost = async(loggedInUser, is_public, image_url, location, end_time, start_time, date, event_name) => {
    try {
        await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: is_public, image_url: image_url, location: location, end_time: end_time, start_time: start_time, date: date, name: event_name}))
      } catch (e) {
        console.log(e);
      }
    }
  

  handleEventCreationSubmit = async () => {
    const { user, is_public, event_pic, event_name, event_date, start_time, end_time, location} = this.state;
    this.createPost(user.id, is_public, event_pic, location, end_time, start_time, event_date, event_name);
    Actions.newsFeed();
  };

  handleEventNameChange = (event_name) => {
    this.setState({
        event_name,
    });
  };

  handlePublicChange = (is_public) => {
    this.setState({
        is_public,
    });
  };


  handleEventDateChange = (event_date) => {
    this.setState({
        event_date,
    });
  };

  handleStartTimeChange = (start_time) => {
    this.setState({
        start_time,
    });
  };

  handleEndTimeChange = (end_time) => {
    this.setState({
        end_time,
    });
  };

  handleLocationChange = (location) => {
    this.setState({
        location,
    });
  };

  handleParticipantsChange = (participants) => {
    this.setState({
        participants,
    });
  };

  handleEventImageChange = (event_pic) => {
    this.setState({
        event_pic,
    });
  };

  handleDescriptionChange = (description) => {
    this.setState({
        description,
    });
  };


  fetchRequestData = async () => {
    try {
        const user = await getloggedInUser()
        const loggedInUserData = await API.graphql(graphqlOperation(getUser, { id: user.id }))
        const all_usernames = await API.graphql(graphqlOperation(listUsersShortened))
        this.setState({user: user, userData: loggedInUserData, all_usernames: all_usernames});
        console.log('BRUH MOMENT')
        console.log(user);
        console.log(loggedInUserData)
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
    const { registerLoading, registerError, registerMessage } = this.props;
    // add error checking to parameters
    const { user, host, is_public, event_pic, event_name, event_date, start_time, end_time, location} = this.state;

    // Check for valid participant username
    var validUsernames = true;
    var usernames = participants.split(",")
    // for (var i = 0; i < usernames.length; i ++) {
    //   // if username doesnt exist, don't create event
    //   var username = usernames[i];
    //   all_usernames.filter(function (username) {
    //     const itemData = username ? username.toUpperCase() : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     if (itemData.indexOf(textData) <= -1) {
    //         validUsernames = false;
    //     }
    //   });
    // }

    const disableCreateEvent = (!validUsernames || is_public != 'true' || is_public != 'false' ||
        !location || location.length === 0 || 
        !event_name || event_name.length === 0);

    return (
      <CreateEventComponent
        loading={registerLoading}
        registerMessage={registerMessage}
        registerError={registerError}
        disableCreateEvent={disableCreateEvent}
        onEventCreationSubmit={this.handleEventCreationSubmit}
        onPublicChange={this.handlePublicChange}
        onEventNameChange={this.handleEventNameChange}
        onEventDateChange={this.handleEventDateChange}
        onStartTimeChange={this.handleStartTimeChange}
        onEndTimeChange={this.handleEndTimeChange}
        onLocationChange={this.handleLocationChange}
        onEventImageChange={this.handleEventImageChange}
        onParticipantsChange={this.handleParticipantsChange}
        onDescriptionChange={this.handleDescriptionChange}
      />);
  }
}

CreateEventScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false,
};

CreateEventScreen.propTypes = {
  registerMessage: PropTypes.object,
  registerLoading: PropTypes.bool,
  registerError: PropTypes.object
};

// export default connect(initMapStateToProps, initMapDispatchToProps)(SignupScreen);
export default CreateEventScreen;