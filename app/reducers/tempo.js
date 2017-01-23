'use strict';

// actions
const SET_TEMPO = 'SET_TEMPO';

// action creators
export const setTempo = (tempo) => {
  return {
    type: SET_TEMPO,
    tempo
  };
};

// reducer
const reducer = (state = 0, action) => {
  switch(action.type){

    case SET_TEMPO:
      return action.tempo;

    default:
      return state;
  }
};

export default reducer;
