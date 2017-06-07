'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import firebaseConfig from './FirebaseConfig'

import * as firebase from 'firebase';
// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyCP1-Ut_BXCDgfhH7d861Bq3N-oUubR1tU",
//     authDomain: "visuall-2f878.firebaseapp.com",
//     databaseURL: "https://visuall-2f878.firebaseio.com",
//     projectId: "visuall-2f878",
//     storageBucket: "visuall-2f878.appspot.com",
//     messagingSenderId: "547811396909"
//   };
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
      .then(() => console.log('Account accepted'))
      .catch((error) => console.log('Account disabled'));
}

class RNHighScores extends React.Component {
  render() {
    myCredential(this.props['idToken'], this.props['accessToken']);
    var contents = this.props["scores"].map(
      score => <Text key={score.name}>{score.name}:{score.value}{"\n"}</Text>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>
          2048 High Scores + Testing Script v04!
        </Text>
        <Text style={styles.scores}>
          {contents}
        </Text>
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

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores);