import * as types from './types'
import * as firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';


export function fetchRecipes(ingredients) {
  return (dispatch, getState) => {
    console.log(getState);
  }
}

export function initFirebase(idToken, accessToken) {
  return (dispatch, getState) => {
    myCredential(idToken, accessToken)  // TODO (Jun 8, 2017): re-write with promises
      .then((user) => {
        return loadTableRefs(user);
      })
      .then( (snapshot) => {
        console.log('my val #2: ', snapshot.val());
        dispatch( setUserInfo(snapshot.key, snapshot.val()) );
      })
      .catch((error) => {
        console.log('Account disabled x 2');
        console.log(error);
      })
  }
}

export function addRecipe() {
  return {
    type: types.ADD_RECIPE,
  }
}

export function setUserInfo(key, val) {
  console.log('my val #3: ', key, val);
  return {
    type: types.SET_USER_INFO,
    userInfo: {key:key, ...val}
  }
}

function myCredential(idToken, accessToken) {
  const credential = firebase
      .auth
      .GoogleAuthProvider
      .credential(idToken, accessToken);

  return firebase
    .auth()
    .signInWithCredential(credential)
    .then((user) => {
      console.log('Account accepted');
      // loadTableRefs(user);
      return Promise.resolve(user);
    })
    .catch((error) => {
      console.log('Account disabled');
      return Promise.error(error);
    });
}

function loadTableRefs(user) {
  console.log(user.email);
  console.log(user.uid);
  var ref = firebase.database().ref("version_01/users/" + user.uid);
  return ref.once('value')
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((error) => {
      return Promise.error(error);
    });
}