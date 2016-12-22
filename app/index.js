'use strict';

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ShowPitchContainer from './showPitchContainer';
// VEX FLOW
import Vex from 'vexflow';
const VF = Vex.Flow;
// Pitch Detect function
import { toggleLiveInput } from './pitchdetect';


render(
  <Provider store={store}>
    <ShowPitchContainer />
  </Provider>,
  document.getElementById('app')
);
