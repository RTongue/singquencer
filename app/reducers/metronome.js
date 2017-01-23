'use strict';

// actions
const SET_BEAT = 'SET_BEAT';
const SET_BAR = 'SET_BAR';
const TOGGLE_PLAY = 'TOGGLE_PLAY';

// action creators
export const setBeat = (num) => {
  return {
    type: SET_BEAT,
    beat: num
  };
};

export const setBar = (time) => {
  return {
    type: SET_BAR,
    time
  };
};

export const togglePlay = (toggle) => {
  return {
    type: TOGGLE_PLAY,
    toggle
  };
};

const initialState = {
  beat: 0,
  currentBarStart: 0,
  isPlaying: false
};

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type){

    case SET_BEAT:
      return Object.assign({}, state, { beat: action.beat });

    case SET_BAR:
      return Object.assign({}, state, { currentBarStart: action.time });

    case TOGGLE_PLAY:
      console.log('in the reducer', Object.assign({}, state, { isPlaying: action.toggle }));
      return Object.assign({}, state, { isPlaying: action.toggle });

    default:
      return state;
  }
};

export default reducer;
