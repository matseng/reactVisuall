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
        return fetchUserInfo(user);
      })
      .then( (userInfo) => {
        return dispatch( setUserInfo(userInfo) );
      })
      .then(() => {
        return Promise.all(
          Object.keys(getState().userInfo['visualls-personal']).map( key => {
            return fetchVisuallMetadata(key)
              .then((metadata) => {
                return dispatch( setVisuallMetadata({key: key, ...metadata}));
              })
          })
        );
      })
      .then((visuallMetadata)=> {
        console.log('all visuall metadata loaded');
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

export function setUserInfo(userInfo) {
  return {
    type: types.SET_USER_INFO,
    userInfo: userInfo
  }
}

export function setVisuallMetadata(metadata) {
  console.log('test setVisuallMetadata', metadata);
  return {
    type: types.SET_VISUALL_METADATA,
    metadata: {...metadata}
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

function fetchUserInfo(user) {
  var ref = firebase.database().ref("version_01/users/" + user.uid);
  return ref.once('value')
    .then((snapshot) => {
      console.log(snapshot.val());
      return Promise.resolve({key: snapshot.key, ...snapshot.val()});
    })
    .catch((error) => {
      return Promise.error(error);
    });
}

function fetchVisuallMetadata(key) {
  var ref = firebase.database().ref("version_01/visualls/" + key + '/metadata');
  return ref.once('value')
    .then((snapshot) => {
      return Promise.resolve(snapshot.val());
    })
    .catch((error) => {
      return Promise.error(error);
    });
}