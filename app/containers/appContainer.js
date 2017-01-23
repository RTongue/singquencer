'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { audioActionCreators } from 'react-redux-webaudio';

import App from '../components/app';

import { setBeat, setBar, togglePlay } from '../reducers/metronome';

let interval = null;
let toneInterval = null;

class AppContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      started: false,
      metronome: null
    };
  }

  componentDidMount () {
    this.props.createGlobalAudioContext();
    Tone.Transport.loop = true;
    Tone.Transport.timeSignature = 4;
    var woodblock = new Tone.Player('../../public/sounds/woodblock.wav').toMaster();
    this.setState({metronome: woodblock})

    Tone.Buffer.onload = (function() {
			//start the Transport for the events to start
      toneInterval = Tone.Transport.scheduleRepeat(((time) => {
        let n = (this.props.currentBeat + 1) % 4 === 0
        ? 4
        : (this.props.currentBeat + 1) % 4;

        if (n === 1) {
          this.props.setBar(time);
        }
        this.props.setBeat(n);
        woodblock.start(time);
      }).bind(this), '4n');
		}).bind(this);
    Tone.Buffer.onload();
  }

  componentDidUpdate () {
    let quarterNote = (60 / this.props.tempo) * 1000;
    if (this.props.tempo
          && this.props.isPlaying
          && !this.state.started) {
      Tone.Transport.bpm.rampTo(this.props.tempo);
      Tone.Transport.start();
      this.setState({started: true});
    } else if (!this.props.isPlaying) {
      clearInterval(interval);
      Tone.Transport.stop();
    }
  }

  render() {
    return (
      <App metronome={this.state.metronome}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tempo: state.tempo,
    currentBeat: state.metronome.beat,
    isPlaying: state.metronome.isPlaying,
    kickLoop: state.tracks.kickLoop
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // you MUST do something like this before using any other actions!!
    createGlobalAudioContext: () =>
      dispatch(audioActionCreators.createGlobalAudioContext()),
    setBeat: (num) => {
      dispatch(setBeat(num));
    },
    setBar: (time) => {
      dispatch(setBar(time));
    }
    // yourNoiseyAction: () => {
    //   // create some audio nodes
    //   dispatch(audioActionCreators.createOscillator('osc'));
    //   dispatch(audioActionCreators.createGain('gainNode'));
    //   // connect the nodes
    //   dispatch(audioActionCreators.connectAudioNodes('osc', 'gainNode'));
    //   dispatch(audioActionCreators.connectAudioNodes('gainNode'));
    //   // assign values to node params
    //   dispatch(audioActionCreators.setParam('osc.type', 'square'));
    //   dispatch(audioActionCreators.setParam('osc.frequency.value', 100));
    //   dispatch(audioActionCreators.oscillatorStart('osc', 0));
    //   dispatch(audioActionCreators.setParam('gainNode.gain.value', 0.1));
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
