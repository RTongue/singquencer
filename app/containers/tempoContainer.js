'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import { setTempo } from '../reducers/tempo';
import { togglePlay } from '../reducers/metronome';

import Tempo from '../components/tempo';

class TempoContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      beats: []
    };
    this.tap = this.tap.bind(this);
  }

  tap () {
    const currentBeats = this.state.beats;
    const time = performance.now();
    if (currentBeats.length < 3) {
      currentBeats.push(time);
      this.setState({beats: currentBeats});
    } else {
      this.calcTempo(...this.state.beats);
      this.setState({beats: []});
    }
  }

  calcTempo (one, two, three) {
    const t1 = (two - one) / 1000;
    const t2 = (three - two) / 1000;
    const bpm = 60 / ((t1 + t2) / 2);
    this.props.togglePlay(!this.props.isPlaying);
    this.props.setTempo(Math.round(bpm));
    console.log('BPM', bpm);
  }

  render () {
    return (
      <Tempo
        tap={this.tap}
        stop={() => {
          if (this.props.isPlaying) {
            this.props.togglePlay(!this.props.isPlaying);
            console.log(this.props.state);
          }
        }}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    tempo: state.tempo,
    isPlaying: state.metronome.isPlaying,
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTempo: (tempo) => {
      dispatch(setTempo(tempo));
    },
    togglePlay: (toggle) => {
      dispatch(togglePlay(toggle));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TempoContainer);
