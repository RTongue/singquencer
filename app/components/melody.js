'use strict';

import React, {Component} from 'react';
import Tone from 'tone';

export default (props) => {
  return (
    <div>
      <div className={'track'} onClick={() => {
        if (!props.tempo) props.track.triggerAttack(0, '+0.1', 1);
        props.record();
      }}>
      <h2>{props.name}</h2>
      </div>
    </div>
  );
};
