'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainLoop from '../components/mainLoop';

import { setBeat } from '../reducers/metronome';



const mapStateToProps = (state) => {
  return {
    tempo: state.tempo,
    currentBeat: state.metronome.beat
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBeat: (num) => {
      dispatch(setBeat(num));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLoop);
