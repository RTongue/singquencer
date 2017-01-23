'use strict';

import React from 'react';
import Tone from 'tone';
import p5 from 'p5';
const map = new p5().map;


import TempoContainer from '../containers/tempoContainer';
import MainLoopContainer from '../containers/mainLoopContainer';
import Metronome from '../components/metronome';
import TrackContainer from '../containers/trackContainer';
import MelodyContainer from '../containers/MelodyContainer';

export default function App (props) {
  console.log('in the app');
  const time = map(1.75, 0, 3.75, 0, 15);

  function renderTrack(container) {
    return (
      <div
        key={container.props.name}
        style={{ width: 'inherit',
                height: '100%',
                display: 'inline-block',
              }}>
        {container}
      </div>
    );
  }

  const tracks = [
    renderTrack(<TrackContainer name={'KICK'} path={'../../public/sounds/kick.wav'}/>),
    renderTrack(<TrackContainer name={'SNARE'} path={'../../public/sounds/snare.wav'}/>),
    renderTrack(<MelodyContainer name={'BASS'} path={'../../public/sounds/bass.wav'}/>),
    renderTrack(<MelodyContainer name={'PIANO'} path={'../../public/sounds/piano-key-a4.wav'}/>)
  ];

  return (
    <div>
      <h1>singquencer</h1>
      {tracks}
      <MainLoopContainer />
      <TempoContainer />
    </div>
  );
}


// Legacy Metronomr off button
// <button onClick={() => {
//     // Tone.Transport.stop();
//     // props.metronome.stop();
//     // console.log(props.metronome);
//   }}>Metronome</button>
