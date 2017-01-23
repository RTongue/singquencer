'use strict';

import React, {Component} from 'react';
import Tone from 'tone';

export default (props) => {
  return (
    <div>
      <div className={'track'} onClick={() => {
        props.record();
      }}>
      <h2>{props.name}</h2>
      </div>
    </div>
  );
};
