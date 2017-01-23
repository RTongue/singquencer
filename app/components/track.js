'use strict';

import React, {Component} from 'react';
import Tone from 'tone';

export default (props) => {
  return (
    <div>
      <div className={'track'} onClick={() => {
        // props.track.triggerAttack(0, '+0.1', 1);
        props.tap();
      }}>
      <h2>{props.name}</h2>
      </div>
    </div>
  );
};
