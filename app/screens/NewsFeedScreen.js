/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import NewsFeedComponent from '../components/NewsFeed';

// News feed screen component which returns NewsFeedComponent
class NewsFeedScreen extends Component {
    displayName = 'NewsFeedScreen';

    render() {
      return (
            // Pass in navigation parameters
            <NewsFeedComponent navigation={this.props.navigation}/>
        );
    }
  }

export default NewsFeedScreen;
