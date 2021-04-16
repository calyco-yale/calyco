/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import NewsFeedComponent from '../components/NewsFeed';


class NewsFeedScreen extends Component {
    displayName = 'NewsFeedScreen';

    render() {
      return (
            <NewsFeedComponent navigation={this.props.navigation}/>
        );
    }
  }

export default NewsFeedScreen;
