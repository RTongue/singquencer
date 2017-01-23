import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import p5 from 'p5';
const map = new p5().map;

import Melody from '../components/melody';

import { addTrack } from '../reducers/tracks';

// Pitch Detect function
import { toggleLiveInput, getPitchData } from '../components/pitchdetect';

class MelodyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: new Array(16).fill(0)
    };
    this.record = this.record.bind(this);
    this.process = this.process.bind(this);
  }

  componentDidMount () {
    var melody = new Tone.Sampler(this.props.path).toMaster();
    const melodyObj = {};
    melodyObj[this.props.name] = melody;
    this.props.addTrack(melodyObj);
  }

  record () {
    Tone.Transport.scheduleOnce(() => {
      toggleLiveInput(); // End input
    }, (new Tone.Time(Tone.Transport.position)).add('1m'));

    toggleLiveInput(); // Start input

    let scheduleObj = {
      time: new Tone.Time(Tone.Transport.position),
      note: null,
      duration: new Tone.Time('16n')
    };

    Tone.Transport.scheduleRepeat(tm => {
      const time = new Tone.Time(Tone.Transport.position);
      const sixteenthFromNow = time.add('16n')
      let note;

      Tone.Transport.scheduleOnce(t => {
        note = getPitchData();
        console.log(note);
        if (!scheduleObj.note) {
          scheduleObj.note = note;
        } else if (scheduleObj.note === note) {
          scheduleObj.duration.add('16n');
        } else {
          this.process(scheduleObj.note, scheduleObj.time, scheduleObj.duration);
          scheduleObj = {
            time: new Tone.Time(Tone.Transport.position),
            note: null,
            duration: new Tone.Time('16n')
          };
        }
      }, sixteenthFromNow);
    }, '16n', '+0.1', '1m');
  }

  process (note, time, duration) {
    // console.log('IN process', duration.eval());
    // if (note - 69 > 18 || note - 69 < -30) return;
    // console.log('post conditional');
    time = time.sub('16n').quantize('16n', 0.5);
    let loop = new Tone.Loop((t) => {
      console.log('in the loop');
      this.props.tracks[this.props.name].triggerAttackRelease(note - 69, duration, t, 1);
    }, '1m').start(time);
  }

  render () {
    return (
      <Melody
        track={this.props.tracks[this.props.name]}
        record={this.record}
        name={this.props.name}
        tempo={this.props.tempo}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tempo: state.tempo,
    tracks: state.tracks,
    currentBarStart: state.metronome.currentBarStart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrack: (track) => {
      dispatch(addTrack(track));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MelodyContainer);
