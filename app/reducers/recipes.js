import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedRecipes = createReducer({}, {

});

export const navigation = createReducer({}, {
  [types.LOAD_VISUALL](state, action) {
    console.log('in recipes.js, LOAD_VISUALL key:', action.key);
    return state;
  }
});

export const userInfo = createReducer({}, {
  [types.SET_USER_INFO](state, action) {
    let newState = {};
    newState = {...action.userInfo};
    return newState;
  }
});

// Add news key of 'visualls' to state tree
export const visualls = createReducer({}, {
  [types.SET_VISUALL_METADATA](state, action) {
    let newState = {...state};
    newState[action.metadata.key] = action.metadata;
    return newState;
  }
});

export const recipeCount = createReducer(-1, {
  [types.ADD_RECIPE](state, action){
    return state + 10;
  }
});
