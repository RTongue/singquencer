'use strict';

import React, { Component } from 'react';
import store from './store';
import { setTheContext, setTheStave } from './action-creators';

// VEX FLOW
import Vex from 'vexflow';
const VF = Vex.Flow;
// Pitch Detect function
import { toggleLiveInput } from './pitchdetect';


export default class ShowPitch extends Component {

  makeStaff () {
    console.log(this.props.notes);
    const note = this.props.notes || [ new VF.StaveNote({ keys: [`C/4`], duration: 'q' }) ];

    const svgContainer = document.createElement('div');
    const renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
    const ctx = renderer.getContext();
    const stave = new VF.Stave(10, 40, 100);  // x, y, width
    stave.addClef("treble").setContext(ctx).draw();
    VF.Formatter.FormatAndDraw(ctx, stave, note);

    return svgContainer;
  }

  componentDidMount () {
    // Create an SVG renderer and attach it to a DIV element.
    // var div = this.refs.staff;
    // var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    //
    // // Configure the rendering context.
    // renderer.resize(300, 300);
    // var context = renderer.getContext();
    // store.dispatch(setTheContext(context));
    // context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    //
    // // Create a stave of width 150 at position 10, 40 on the canvas.
    // var stave = new VF.Stave(10, 40, 300);


    // Add a clef and time signature.
    // stave.addClef('treble').addTimeSignature('4/4');
    //
    // // Connect it to the rendering context and draw!
    // stave.setContext(context).draw();
    //
    // store.dispatch(setTheStave(stave));
    this.refs.staff.appendChild(this.makeStaff());
  }

  componentDidUpdate () {
    let child = this.refs.staff.lastChild
    // Create an SVG renderer and attach it to a DIV element.
    // var div = this.refs.staff;
    // div.removeChild()
    // console.log(div);
    // var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    //
    // // Configure the rendering context.
    // renderer.resize(300, 300);
    // var context = renderer.getContext();
    // context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    //
    // // Create a stave of width 150 at position 10, 40 on the canvas.
    // var stave = new VF.Stave(10, 40, 300);
    //
    //
    // // Add a clef and time signature.
    // stave.addClef("treble").addTimeSignature("4/4");
    //
    // // Connect it to the rendering context and draw!
    // stave.setContext(context).draw();

    // Create a voice in 4/4 and add above notes
    // NOTE: Initially num_beats was given as
    // the length of the notes array: this.props.notes.length
    // Since notes is undefined at first
    // componentDidUpdate, this can also be
    // manally set to one as only one note will
    // be rendered at a time.
    // var voice = new VF.Voice({num_beats: 1,  beat_value: 4});
    // voice.addTickables(this.props.notes);
    //
    // // Format and justify the notes to 400 pixels.
    // var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    //
    // // Render voice
    // voice.draw(this.props.context, this.props.stave);
    console.log(this.refs.outer);
    this.refs.staff.replaceChild(this.makeStaff(), child);
  }

  render () {
    return (
      <div>
        <h1>Sight Singer</h1>
        <div ref="staff"></div>
        <div>
          <button onClick={toggleLiveInput}>Sing!</button>
        </div>
      </div>
    );
  }

}

// render(
//   <Provider store={store}>
//     <HomeContainer />
//   </Provider>,
//   document.getElementById('app')
// );


// HTML/CSS EXAMPLE OF RENDERING STAVES & NOTES
// return (
//   <div>
//     <h1>Sight Singer</h1>
//     <div className="sheetmusic">
//     <section className="staff">
//       <section className="bar">
//         <span className="g-clef">{'\uD834\uDD20'}</span>
//         <span className="note lower-c">&#9833;</span>
//         <span className="note lower-c">&#9833;</span>
//         <span className="note lower-g">&#9833;</span>
//         <span className="note lower-g">&#9833;</span>
//       </section>
//     </section>
//
//     <section className="staff">
//       <section className="bar">
//           <span className="f-clef">&#119074;</span>
//       </section>
//     </section>
//     </div>
//   </div>
// );
