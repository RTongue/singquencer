// VEX FLOW
import Vex from 'vexflow';
const VF = Vex.Flow;

import { CHANGE_PITCH, SET_CONTEXT, SET_STAVE } from './constants';

const defaultState = {
  notes: [new VF.StaveNote({ keys: ["c/4"], duration: "q" })],
  context: {},
  stave: {}
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case CHANGE_PITCH:
      return Object.assign({}, state, {
        notes: [ new VF.StaveNote({ keys: [`${action.value}/4`], duration: 'q' }) ]
      });
    case SET_CONTEXT:
      return Object.assign({}, state, {
        context: action.value
      });
    case SET_STAVE:
      return Object.assign({}, state, {
        stave: action.value
      });
    default:
      return state;
  }
}
