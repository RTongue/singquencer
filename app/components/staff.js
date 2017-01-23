import React from 'react';

export default function Staff (props) {
  // Create an SVG renderer and attach it to a DIV element.
  var div = this.refs.staff;
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(300, 300);
  var context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  // Create a stave of width 150 at position 10, 40 on the canvas.
  var stave = new VF.Stave(10, 40, 300);

  // Add a clef and time signature.
  stave.addClef("treble").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  return (
    <div>
      <h1>Sight Singer</h1>
      <div ref='staff'></div>
      <div>
        <button onClick={toggleLiveInput}>Sing!</button>
      </div>
    </div>
  );
}
