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
  ListView,
  StyleSheet,
  Platform
} = ReactNative;
import { connect } from 'react-redux'
import MyList from "../components/VisuallsListView";

class Home extends Component {
  constructor(props)
  {
    super(props);
    this.props.initFirebase(this.props['idToken'], this.props['accessToken']);
    this.handleOnRowPress = this.handleOnRowPress.bind(this);
  }

  // Convert hashmap of visualls to array of visualls
  visualls() {
    return Object.keys(this.props.visualls).map(key => this.props.visualls[key]);
  }

  handleOnRowPress(key)
  {
    this.props.loadVisuall(key);
  }

  render() {
    console.log('Home.js props updated ');
    return <View style={styles.container}> 
      <View> 
        <TouchableHighlight onPress = { () => this.searchPressed() }>
          <Text>Fetch Recipes </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.content}>
        <MyList
          dataSource={this.visualls()}
          onRowPress={this.handleOnRowPress}
        />
      </View>
    </View>
  }
}

// Defines what state values map to props
// render method will be called upon change in props
function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes,
    userInfo: state.userInfo,
    visualls: state.visualls
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
})
