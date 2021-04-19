import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import CreateEventComponent from '../components/CreateEvent';

// query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listEventsShortened } from '../../src/graphql/custom_queries';
import { Actions } from 'react-native-router-flux';
import { createEvent, deleteEvent} from '../../src/graphql/custom_mutations';
import { getloggedInUser } from '../helpers';
import { getUser } from '../../src/graphql/queries';

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // host object, pass in username, profile picture into the create event component
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

  createPost = async(loggedInUser, is_public, image_url, end_time, start_time, event_name, description, participants) => {
    try {
        await API.graphql(graphqlOperation(createEvent, { userId: loggedInUser, public: is_public, image_url: image_url, end_datetime: end_time, start_datetime: start_time, name: event_name, description: description, participants: participants}))
      } catch (e) {
        console.log(e);
      }
    }
  

  handleEventCreationSubmit = async () => {
    const { user, is_public, event_pic, event_name, start_time, end_time, description, participants} = this.state;
    this.createPost(user.id, is_public, event_pic, end_time, start_time, event_name, description, participants);
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
        this.setState({user: user, userData: loggedInUserData});
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
    const { is_public, start_time, end_time, description, participants} = this.state;
    const disableCreateEvent = (!is_public || !start_time || !end_time || !description);

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
        participants={this.state.participants}
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