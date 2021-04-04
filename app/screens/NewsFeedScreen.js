/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import NewsFeedComponent from '../components/NewsFeed';


class NewsFeedScreen extends Component {
    displayName = 'NewsFeedScreen';

    render() {
      return (
            <NewsFeedComponent navigation={this.props.navigation}/>
        );
    }
  }
  
//   NewsFeedScreen.defaultProps = {
//   };
  
//   NewsFeedScreen.propTypes = {
//   };

  export default NewsFeedScreen;
