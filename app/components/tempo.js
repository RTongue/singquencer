'use strict';

import React, {Component} from 'react';

export default (props) => {
  return (
    <div>
      <button onMouseDown={props.tap} className={'track'} style={{color: '#22ff55', background: '#222'}}>SET TEMPO</button>
      <button onClick={props.stop} className={'track'} style={{color: '#ff9900', background: '#222'}}>STOP</button>
    </div>
  );
};
