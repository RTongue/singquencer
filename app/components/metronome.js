'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setBeat, togglePlay } from '../reducers/metronome';

let // isPlaying = false,          // Are we currently playing?
    startTime,                  // The start time of the entire sequence.
    currentQuarterNote = 0,         // What note is currently last scheduled?
    // This is calculated from lookahead, and overlaps
    // with next interval (in case the timer is late)
    nextNoteTime = 0.0,         // when the next note is due.
    interval = 25.0,             // For timerWorker
    timerID = null,             // For timerWorker
    advanceBeat = null,         // For advancing Beat Number on state
    // tempo = bpm,              // tempo (in beats per minute)
    lookahead = 25.0,           // How frequently to call scheduling function
    //(in milliseconds)
    scheduleAheadTime = 0.1,    // How far ahead to schedule audio (sec)
    noteLength = 0.05,        // length of "beep" (in seconds)
    notesInQueue = [];      // the notes that have been put into the web audio,
    // and may or may not have played yet. {note, time}

class Metronome extends Component {
  constructor (props) {
    super(props);
    this.timerWorker = this.timerWorker.bind(this);
    this.play = this.play.bind(this);
    this.nextNote = this.nextNote.bind(this);
    this.scheduleNote = this.scheduleNote.bind(this);
    this.scheduler = this.scheduler.bind(this);
  }

  componentDidUpdate () {
    if (this.props.tempo) {
      this.play();
    }
  }

  timerWorker (e) {
    console.log(e);

    if (e === 'start') {
      console.log('starting');
      timerID = setInterval(this.scheduler, interval);
      // advanceBeat = setInterval((currentQuarterNote) => this.props.setBeat(currentQuarterNote), (60.0 / this.props.tempo))
    }	else if (e === 'stop') {
      console.log('stopping');
      clearInterval(timerID);
      timerID = null;
    } else {
      console.log('setting interval');
      interval = e;
      console.log('interval=' + interval);
      if (timerID) {
        clearInterval(timerID);
        timerID = setInterval(this.scheduler, interval);
      }
    }
  }

  play () {
    console.log('PLAY', this.props);
    if (this.props.isPlaying) { // start playing
      currentQuarterNote = 0;
      console.log(this.props.audioContext);
      nextNoteTime = this.props.audioContext.currentTime;
      this.timerWorker('start');
      return 'stop';
    } else {
      this.timerWorker('stop');
      return 'play';
    }
  }

  nextNote () {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / this.props.tempo;    // Notice this picks up the CURRENT
                                          // tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat;    // Add beat length to last beat time
    // TODO make this come from / update State
    currentQuarterNote++;    // Advance the beat number, wrap to zero
    if (currentQuarterNote === 4) {
      currentQuarterNote = 0;
    }
    // this.props.setBeat(currentQuarterNote);
  }

  scheduleNote (beatNumber, time) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );

    // if ((noteResolution === 1) && (beatNumber % 2)) {
    //   return; // we're not playing non-8th 16th notes
    // }
    // if ((noteResolution === 2) && (beatNumber % 4)) {
    //   return; // we're not playing non-quarter 8th notes
    // }

    // create an oscillator
    var osc = this.props.audioContext.createOscillator();
    osc.connect(this.props.audioContext.destination);
    if (beatNumber % 4 === 0) {
      osc.frequency.value = 880.0; // beat 0 == high pitch
    // } else if (beatNumber % 4 === 0 ) {
    //   osc.frequency.value = 440.0; // quarter notes = medium pitch
    } else {
      osc.frequency.value = 220.0; // other 16th notes = low pitch
    }

    // osc.start(time);
    // console.log('OSC START');
    // osc.stop(time + noteLength);
    // console.log('OSC STOP');
  }

  scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextNoteTime < this.props.audioContext.currentTime + scheduleAheadTime) {
      this.scheduleNote(currentQuarterNote, nextNoteTime);
      this.nextNote();
    }
  }

  render () {
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    audioContext: state.audioContextProvider.audioContextAndGraph.context,
    tempo: state.tempo,
    isPlaying: state.metronome.isPlaying
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBeat: (beat) => {
      dispatch(setBeat(beat));
    },
    togglePlay: (toggle) => {
      dispatch(togglePlay(toggle));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);

//////////// LEGACY CODE /////////////////
// const timerWorker = function (e) {
// 	console.log(e);
//
// 	if (e === 'start') {
// 		console.log('starting');
// 		timerID = setInterval(function(){
// 			scheduler();
// 		}, interval);
// 	}	else if (e === 'stop') {
// 		console.log('stopping');
// 		clearInterval(timerID);
// 		timerID = null;
// 	} else {
// 		console.log('setting interval');
// 		interval = e;
// 		console.log('interval=' + interval);
// 		if (timerID) {
// 			clearInterval(timerID);
// 			timerID = setInterval(function(){scheduler();}, interval);
// 		}
// 	}
// };

// const play = function () {
//     isPlaying = !isPlaying;
//
//     if (isPlaying) { // start playing
//         currentQuarterNote = 0;
//         nextNoteTime = audioContext.currentTime;
//         timerWorker('start');
//         return 'stop';
//     } else {
//         timerWorker('stop');
//         return 'play';
//     }
// };

// function nextNote() {
//     // Advance current note and time by a 16th note...
//     var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT
//                                           // tempo value to calculate beat length.
//     nextNoteTime += secondsPerBeat;    // Add beat length to last beat time
//
//     currentQuarterNote++;    // Advance the beat number, wrap to zero
//     if (currentQuarterNote === 4) {
//         currentQuarterNote = 0;
//     }
// }
//
// function scheduleNote (beatNumber, time) {
//     // push the note on the queue, even if we're not playing.
//     notesInQueue.push( { note: beatNumber, time: time } );
//
//     // if ((noteResolution === 1) && (beatNumber % 2)) {
//     //   return; // we're not playing non-8th 16th notes
//     // }
//     // if ((noteResolution === 2) && (beatNumber % 4)) {
//     //   return; // we're not playing non-quarter 8th notes
//     // }
//
//     // create an oscillator
//     var osc = audioContext.createOscillator();
//     osc.connect(audioContext.destination);
//     if (beatNumber % 4 === 0) {
//       osc.frequency.value = 880.0; // beat 0 == high pitch
//     // } else if (beatNumber % 4 === 0 ) {
//     //   osc.frequency.value = 440.0; // quarter notes = medium pitch
//     } else {
//       osc.frequency.value = 220.0; // other 16th notes = low pitch
//     }
//
//     osc.start(time);
//     console.log('OSC START');
//     osc.stop(time + noteLength);
//     console.log('OSC STOP');
// }
//
// function scheduler() {
//     // while there are notes that will need to play before the next interval,
//     // schedule them and advance the pointer.
//     while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
//         scheduleNote(currentQuarterNote, nextNoteTime);
//         nextNote();
//     }
// }


// export { play, nextNoteTime, scheduleAheadTime, currentQuarterNote };
