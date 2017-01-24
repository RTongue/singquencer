'use strict';

import React, {Component} from 'react';
import Tone from 'tone';
import keydown from 'react-keydown';

export default (props) => {
  return (
    <div>
      <div className={'track'} onClick={(e) => {
          console.log(e.key);
        if (!props.tempo) props.track.triggerAttack(0, '+0.1', 1);
        props.tap();
      }}>
      <h2>{props.name}</h2>
      </div>
    </div>
  );
};
