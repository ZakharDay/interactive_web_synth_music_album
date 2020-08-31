import _ from 'lodash'
import React from 'react'
import * as Tone from 'tone'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class PolySynth extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'handleValueChange', 'renderSynth')
  }

  handleValueChange(name, property, value) {
    const { changeSynthValue } = this.props
    changeSynthValue(name, property, value)
  }

  renderSynth(s, i) {
    const { synth } = this.props
    const typeSet = ['sine', 'square', 'triangle', 'sawtooth', 'fatsawtooth']
    const { type, count, spread, phase, fadeIn } = s.oscillator
    const { attack, decay, sustain, release, attackCurve } = s.envelope

    return (
      <div className="controlsRow" key={i}>
        <h2>Oscillator</h2>

        <h2>Type</h2>
        <ButtonSet
          name={synth}
          property={'[' + i + ']oscillator.type'}
          set={typeSet}
          value={type}
          handleValueChange={this.handleValueChange}
        />

        <h2>Count</h2>
        <Slider
          name={synth}
          property={'[' + i + ']oscillator.count'}
          min="0"
          max="10"
          value={count}
          handleValueChange={this.handleValueChange}
        />

        <h2>Spread</h2>
        <Slider
          name={synth}
          property={'[' + i + ']oscillator.spread'}
          min="0"
          max="100"
          value={spread}
          handleValueChange={this.handleValueChange}
        />

        <h2>Phase</h2>
        <Slider
          name={synth}
          property={'[' + i + ']oscillator.phase'}
          min="0"
          max="10"
          value={phase}
          handleValueChange={this.handleValueChange}
        />

        <h2>Fade In</h2>
        <Slider
          name={synth}
          property={'[' + i + ']oscillator.fadeIn'}
          min="0"
          max="10"
          value={fadeIn}
          handleValueChange={this.handleValueChange}
        />
      </div>
    )
  }

  render() {
    const { text, synth, instrument, on, togglePlay } = this.props
    const { detune, portamento, oscillator, envelope } = instrument.get()
    const { type, count, spread, phase, fadeIn } = oscillator

    const {
      attack,
      decay,
      sustain,
      release,
      attackCurve,
      decayCurve,
      releaseCurve
    } = envelope

    // prettier-ignore
    const curveSet = ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step']
    const decayCurveSet = ['linear', 'exponential']
    const typeSet = ['sine', 'square', 'triangle', 'sawtooth', 'fatsawtooth']

    return (
      <div className="Synth">
        <ToggleButton text={text} on={on} handleClick={togglePlay} />
        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Envelope</h2>

            <h2>Attack</h2>
            <Slider
              name={synth}
              property={'[0]envelope.attack'}
              min="0"
              max="1"
              value={attack}
              handleValueChange={this.handleValueChange}
            />

            <h2>Decay</h2>
            <Slider
              name={synth}
              property={'[0]envelope.decay'}
              min="0"
              max="1"
              value={decay}
              handleValueChange={this.handleValueChange}
            />

            <h2>Sustain</h2>
            <Slider
              name={synth}
              property={'[0]envelope.sustain'}
              min="0"
              max="1"
              value={sustain}
              handleValueChange={this.handleValueChange}
            />

            <h2>Release</h2>
            <Slider
              name={synth}
              property={'[0]envelope.release'}
              min="0"
              max="10"
              value={release}
              handleValueChange={this.handleValueChange}
            />

            <h2>Attack Curve</h2>
            <ButtonSet
              name={synth}
              property={'[0]envelope.attackCurve'}
              set={curveSet}
              value={attackCurve}
              handleValueChange={this.handleValueChange}
            />

            <h2>Decay Curve</h2>
            <ButtonSet
              name={synth}
              property={'[0]envelope.decayCurve'}
              set={decayCurveSet}
              value={decayCurve}
              handleValueChange={this.handleValueChange}
            />

            <h2>Release Curve</h2>
            <ButtonSet
              name={synth}
              property={'[0]envelope.releaseCurve'}
              set={curveSet}
              value={releaseCurve}
              handleValueChange={this.handleValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
