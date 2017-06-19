'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions';
import Home from './Home';

class AppContainer extends React.Component {
  render() {
    return <Home {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// This function attaches the state and actions to AppContainer, 
// which are accessible as props.
export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);