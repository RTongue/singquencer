'use strict';

// actions
const ADD_TRACK = 'ADD_TRACK';
const PLAY = 'PLAY';

// action creators
export const addTrack = (track) => {
  return {
    type: ADD_TRACK,
    track
  };
};

export const play = (track) => {
  return {
    type: PLAY,
    track
  };
};

const initialState = {

};

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type){

    case ADD_TRACK:
      return Object.assign({}, state, action.track);

    default:
      return state;
  }
};

export default reducer;
