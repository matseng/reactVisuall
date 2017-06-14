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
  StyleSheet
} = ReactNative;
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props)
  {
    super(props);
    this.props.initFirebase(this.props['idToken'], this.props['accessToken']);
  }

  // Convert hashmap of visualls to array of visualls
  visualls() {
    return Object.keys(this.props.visualls).map(key => this.props.visualls[key]);
  }

  render() {
    console.log('Home.js props updated ');
    return <View style={{marginTop: 20}}> 
    <View> 
      <TouchableHighlight onPress = { () => this.searchPressed() }>
        <Text>Fetch Recipes </Text>
      </TouchableHighlight>
    </View>
    <ScrollView>
      {this.visualls().map(visuall => {
        return <View key={visuall.key}>
          <Text>{visuall.title}</Text>
        </View>
      })}
    </ScrollView>
    <MyList
      dataSource={this.visualls()}
    />
    </View>
  }
}

class MyList extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds, 
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.ds.cloneWithRows(this.props.dataSource)}
        renderRow={(rowData) => <Text>{rowData.title}</Text>}
      />
    );
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
