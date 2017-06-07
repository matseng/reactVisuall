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
    })
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