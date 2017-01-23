'use strict';

import React, { Component } from 'react';

// VEX FLOW
import Vex from 'vexflow';
const VF = Vex.Flow;

// Pitch Detect function
import { toggleLiveInput, isPlaying } from './pitchdetect';

// Metronome
import { play } from './metronome';

function click () {
  toggleLiveInput();
  play();
}

export default class Practice extends Component {

  makeStaff () {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    const svgContainer = document.createElement('div');
    var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 250);
    var context = renderer.getContext();
    context.setFont("Arial", 12, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 475);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature('4/4');

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    var notes = [
      new VF.StaveNote({ keys: ["c/4"], duration: "q" })
      .addModifier(0, new VF.Annotation('Do')
      .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)),
      new VF.StaveNote({ keys: ["d/4"], duration: "q" })
      .addModifier(0, new VF.Annotation('re')
      .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)),
      new VF.StaveNote({ keys: ["e/4"], duration: "q" })
      .addModifier(0, new VF.Annotation('mi')
      .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)),
      new VF.StaveNote({ keys: ["f/4"], duration: "q" })
      .addModifier(0, new VF.Annotation('fa')
      .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)),
      new VF.StaveNote({ keys: ["g/4"], duration: "h" })
      .addModifier(0, new VF.Annotation('sol')
      .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)),
      new VF.StaveNote({ keys: ["b/4"], duration: "hr" })
    ];

    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({num_beats: 8,  beat_value: 4});
    voice.addTickables(notes);
    stave.drawVerticalBar(292, true);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);

    return svgContainer;
  }

  componentDidMount () {
    this.refs.staff.appendChild(this.makeStaff());
  }

  render () {
    return (
      <div>
        <div ref="staff"></div>
        <div>
          <button onClick={click}>Start</button>
        </div>
      </div>
    );
  }

}
