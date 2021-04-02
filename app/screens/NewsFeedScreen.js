/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { withNavigation } from 'react-navigation';
import NewsFeedComponent from '../components/NewsFeed';


class NewsFeedScreen extends Component {
    displayName = 'NewsFeedScreen';

    render() {
      console.log('guacamole')
      console.log(this)
      return (
            <NewsFeedComponent navigation={this.props.navigation}/>
        );
    }
  }
  
//   NewsFeedScreen.defaultProps = {
//   };
  
//   NewsFeedScreen.propTypes = {
//   };

  export default withNavigation(NewsFeedScreen);
