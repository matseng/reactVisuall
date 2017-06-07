import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedRecipes = createReducer({}, {

});

export const recipeCount = createReducer(-1, {
  [types.ADD_RECIPE](state, action){
    return state + 1;
  }
});
