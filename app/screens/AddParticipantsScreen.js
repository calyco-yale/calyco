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

class AddParticipantsScreen extends Component {

  render() {
    return (null);
  }
}

export default AddParticipantsScreen;