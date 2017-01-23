// Actions
import { CHANGE_PITCH, SET_CONTEXT, SET_STAVE } from './constants';

// Actions Creators
export const changeThePitch = (pitch) => {
  return {
    type: CHANGE_PITCH,
    value: pitch
  };
};

export const setTheContext = (context) => {
  return {
    type: SET_CONTEXT,
    value: context
  };
};

export const setTheStave = (stave) => {
  return {
    type: SET_STAVE,
    value: stave
  };
};
