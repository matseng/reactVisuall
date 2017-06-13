// Home.js

'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet
} = ReactNative;
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props)
  {
    super(props);
    this.props.initFirebase(this.props['idToken'], this.props['accessToken']);
  }

  searchPressed() {
    this.props.fetchRecipes('bacon, cucumber, banana');
  }

  render() {
    console.log('Home.js props: ', this.props);
    return <View style={{marginTop: 20}}> 
    <View> 
      <TouchableHighlight onPress = { () => this.searchPressed() }>
        <Text>Fetch Recipes </Text>
      </TouchableHighlight>
    </View>
    <ScrollView></ScrollView>
    </View>
  }
}

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Home);
