import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedRecipes = createReducer({}, {

});

export const userInfo = createReducer({}, {
  [types.SET_USER_INFO](state, action) {
    let newState = {};
    // newState['userInfo'] = {key: action.userInfo.key, ...action.userInfo.val};
    newState = {...action.userInfo};
    return newState;
  }
});

export const recipeCount = createReducer(-1, {
  [types.ADD_RECIPE](state, action){
    return state + 10;
  }
});
