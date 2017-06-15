/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './app/reducers'
import AppContainer from './app/containers/AppContainer'
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const loggerMidderware = createLogger({ predicate: (getState, actions) => __DEV__});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      // loggerMidderware
      ),
    );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class App extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <AppContainer {...this.props} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RNHighScores', () => App);

