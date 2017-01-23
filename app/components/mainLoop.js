'use strict';

import React, {Component} from 'react';

import Beat from './beat';
// import Track from './track';

export default (props) => {
  function renderBeat(i) {
    return (
      <div
        key={i}
        style={{ width: '25%',
                height: '100%',
                backgroundColor: '#ff00ff',
                display: 'inline-block',
                opacity: props.currentBeat === i + 1 ? '0.4' : '0.0',
                borderRadius: '15px'
              }}>
        <Beat />
      </div>
    );
  }

  const beats = [];
  for (var i = 0; i < 4; i++) {
    beats.push(renderBeat(i));
  }

  return (
    <div className={'loop'}>

      {beats}
    </div>
  );
};
