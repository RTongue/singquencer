import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import p5 from 'p5';
const map = new p5().map;

import Track from '../components/track';

import { addTrack } from '../reducers/tracks';

class TrackContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rhythm: new Array(16).fill(0)
    };
    this.tap = this.tap.bind(this);
    this.calcRhythm = this.calcRhythm.bind(this);
  }

  componentDidMount () {
    const track = new Tone.Sampler(this.props.path).toMaster();
    const trackObj = {};
    trackObj[this.props.name] = track;
    this.props.addTrack(trackObj);
  }


  tap () {
    // const currentBeats = this.state.rhythm;
    // const time = (performance.now() / 1000);
    // const dist = Math.floor(time - this.props.currentBarStart);
    // const i = Math.floor(map(dist, 0, (15 * (15 / this.props.tempo)), 0, 15)) % 16;
    // this.props.tracks.kickLoop.add(i, this.props.tracks.kick.triggerAttack(0, '+0.1', 1));
    // currentBeats[i] = 1;
    // this.calcRhythm();
    // this.setState({beats: currentBeats});
    // this.calcRhythm(this.state.beats);

    // let time = new Tone.Time(Tone.now()).quantize('16n', 1).toBarsBeatsSixteenths();
    // console.log('PERF.NOW', performance.now());
    // console.log('TIME.NOW', Tone.now());
    // console.log('NEW TONE.TIME', new Tone.Time(Tone.now()));
    // console.log('QUNTIZED', new Tone.Time(Tone.now()).quantize('16n', 1));
    // console.log(time);
    let time = new Tone.Time(Tone.Transport.position);
    time = time.sub('16n').quantize('16n', 0.5);
    let loop = new Tone.Loop((t) => {
      this.props.tracks[this.props.name].triggerAttack(0, t, 1);
    }, '1m').start(time);
  }

  calcRhythm () {
    // console.log('THIS RAN!!!!!!!!!!!!!!!!!!!!!');
    // const kickLoop = new Tone.Sequence((time, col) => {
    //   if (this.state.beats[col] === 1) {
    //     this.props.tracks.kick.triggerAttack(0, time, 1);
    //   }
    // }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n');
    // this.props.addTrack({'kickLoop': kickLoop})
    // kickLoop.start('1m');
  }

  render () {
    return (<Track
              track={this.props.tracks[this.props.name]}
              tap={this.tap}
              schedule={this.calcRhythm}
              name={this.props.name}
            />);
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
