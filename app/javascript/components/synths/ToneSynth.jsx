import _ from 'lodash'
import React from 'react'
import * as Tone from 'tone'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class ToneSynth extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'handleValueChange')
  }

  handleValueChange(name, property, value) {
    const { changeSynthValue } = this.props
    changeSynthValue(name, property, value)
  }

  render() {
    const { text, synth, instrument, on, togglePlay } = this.props
    const { harmonicity, modulationIndex, resonance, octaves } = instrument
    const { type, sourceType, modulationType, phase } = instrument.oscillator
    const { attack, decay, sustain, release } = instrument.envelope

    const typeSet = ['sine', 'square', 'triangle', 'sawtooth']
    const sourceTypeSet = ['fm', 'am', 'fat', 'pwm', 'pulse']
    const modulationTypeSet = ['sine', 'square', 'triangle', 'sawtooth']

    return (
      <div className="Synth">
        <ToggleButton text={text} on={on} handleClick={togglePlay} />

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Type</h2>
            <ButtonSet
              name={synth}
              property="oscillator.type"
              set={typeSet}
              value={type}
              handleValueChange={this.handleValueChange}
            />

            <h2>Source Type</h2>
            <ButtonSet
              name={synth}
              property="oscillator.sourceType"
              set={sourceTypeSet}
              value={sourceType}
              handleValueChange={this.handleValueChange}
            />

            <h2>Modulation Type</h2>
            <ButtonSet
              name={synth}
              property="oscillator.modulationType"
              set={modulationTypeSet}
              value={modulationType}
              handleValueChange={this.handleValueChange}
            />

            <h2>Phase</h2>
            <Slider
              name={synth}
              property="oscillator.phase"
              min="0"
              max="360"
              value={phase}
              handleValueChange={this.handleValueChange}
            />

            <h2>Envelope</h2>

            <h2>Attack</h2>
            <Slider
              name={synth}
              property="envelope.attack"
              min="0"
              max="1"
              value={attack}
              handleValueChange={this.handleValueChange}
            />

            <h2>Decay</h2>
            <Slider
              name={synth}
              property="envelope.decay"
              min="0"
              max="1"
              value={decay}
              handleValueChange={this.handleValueChange}
            />

            <h2>Sustain</h2>
            <Slider
              name={synth}
              property="envelope.sustain"
              min="0"
              max="1"
              value={sustain}
              handleValueChange={this.handleValueChange}
            />

            <h2>Release</h2>
            <Slider
              name={synth}
              property="envelope.release"
              min="0"
              max="1"
              value={release}
              handleValueChange={this.handleValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
