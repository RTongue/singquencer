'use strict';

import React, { Component } from 'react';
import store from './store'; // TODO get rid of store - should be unused
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
    this.refs.staff.appendChild(this.makeStaff());
  }

  componentDidUpdate () {
    let child = this.refs.staff.lastChild;
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
