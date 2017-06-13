import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedRecipes = createReducer({}, {

});

export const userInfo = createReducer({}, {
  [types.SET_USER_INFO](state, action) {
    let newState = {};
    newState = {...action.userInfo};
    return newState;
  }
});

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
