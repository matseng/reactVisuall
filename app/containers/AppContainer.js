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
import * as firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';
import Home from './Home';

firebase.initializeApp(firebaseConfig);

function myCredential(idToken, accessToken)
{
  const credential = firebase
      .auth
      .GoogleAuthProvider
      .credential(idToken, accessToken);

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((user) => {
      console.log('Account accepted');
      loadTableRefs(user);
    })
    .catch((error) => console.log('Account disabled'));
}

function loadTableRefs(user) {
  console.log(user.email);
  console.log(user.uid);
  var ref = firebase.database().ref("version_01/users/" + user.uid);
  ref.once('value')
    .then((snapshot) => {
      console.log(snapshot.key);
      console.log(snapshot.val());
      // TODO (Jun 7, 2017): Store in redux
    })
}

class AppContainer extends React.Component {
  render() {
    return <Home {...this.props} />
  }
}

class __AppContainer extends React.Component {
  constructor(props) {
    super(props);
    myCredential(this.props['idToken'], this.props['accessToken']);
    // this.state = { recipeCount: 0 };
  }

  incrementRecipeCount() {
    this.setState({recipeCount: this.state.recipeCount+1});
  }

  addRecipe() {
    this.props.addRecipe();
  }

  render() {
    var contents = this.props["scores"].map(
      score => <Text key={score.name}>{score.name}:{score.value}{"\n"}</Text>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>
          2048 High Scores + Testing Script v05!
        </Text>
        <Text style={styles.scores}>
          {contents}
        </Text>
        <Text style={{marginTop: 20}}>
          {/* I am AppContainer! Recipe Count: {this.state.recipeCount} */}
          I am AppContainer! Recipe Count: {this.props.recipeCount}
        </Text>
        {/* <TouchableHighlight onPress={() => {this.incrementRecipeCount() }}> */}
        <TouchableHighlight onPress={() => {this.addRecipe() }}>
            <Text>Add recipe </Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// This function attaches the state and actions to AppContainer, 
// which are accessible as props.
export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);