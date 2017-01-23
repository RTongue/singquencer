import { combineReducers } from 'redux';
import { audioContextProvider, audioActionCreators } from 'react-redux-webaudio';

const rootReducer = combineReducers({
  audioContextProvider,
  tempo: require('./tempo').default,
  metronome: require('./metronome').default,
  tracks: require('./tracks').default,
  staff: require('./reducer').default
});

export default rootReducer;
