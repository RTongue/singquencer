'use strict';

import React, {Component} from 'react';
import InputRange from 'react-input-range';


export default (props) => {


  function onChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    props.setTempo(event.target.value)
  }

  function onVolChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    console.log(props);
    props.woodblock.volume.value = event.target.value
  }

  return (
    <div>
      <button onMouseDown={props.tap} className={'track'} style={{color: '#22ff55', background: '#222'}}>SET TEMPO</button>
      <button onClick={props.stop} className={'track'} style={{color: '#ff9900', background: '#222', margin: '25px'}}>STOP</button>
      <div className={'control'}>
        <input id={'controls'} type={'range'} max={300} min={20} step={5} onChange={onChange}></input>
        <h3 id={'controls'}>{props.tempo}BPM</h3>
        <input id={'controls'} type={'range'} max={1} min={-100} step={0.1} onChange={onVolChange}></input>
        <h3 id={'controls'}>VOLUME</h3>
      </div>
    </div>
  );
};
