'use strict';

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
// Pitch Detect function
import { toggleLiveInput } from './components/pitchdetect';

import AppContainer from './containers/appContainer';


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
