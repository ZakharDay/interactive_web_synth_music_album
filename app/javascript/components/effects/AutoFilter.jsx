import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'
import Select from '../controls/Select'

export default class AutoFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // prettier-ignore
    const typeSet = ["sawtooth","sine","square","triangle","sine1","sine2","sine3","sine4","sine5","sine6","sine7","sine8","sine9","sine10","sine11","sine12","sine13","sine14","sine15","sine16","sine17","sine18","sine19","sine20","sine21","sine22","sine23","sine24","sine25","sine26","sine27","sine28","sine29","sine30","sine31","sine32","square1","square2","square3","square4","square5","square6","square7","square8","square9","square10","square11","square12","square13","square14","square15","square16","square17","square18","square19","square20","square21","square22","square23","square24","square25","square26","square27","square28","square29","square30","square31","square32","triangle1","triangle2","triangle3","triangle4","triangle5","triangle6","triangle7","triangle8","triangle9","triangle10","triangle11","triangle12","triangle13","triangle14","triangle15","triangle16","triangle17","triangle18","triangle19","triangle20","triangle21","triangle22","triangle23","triangle24","triangle25","triangle26","triangle27","triangle28","triangle29","triangle30","triangle31","triangle32","sawtooth1","sawtooth2","sawtooth3","sawtooth4","sawtooth5","sawtooth6","sawtooth7","sawtooth8","sawtooth9","sawtooth10","sawtooth11","sawtooth12","sawtooth13","sawtooth14","sawtooth15","sawtooth16","sawtooth17","sawtooth18","sawtooth19","sawtooth20","sawtooth21","sawtooth22","sawtooth23","sawtooth24","sawtooth25","sawtooth26","sawtooth27","sawtooth28","sawtooth29","sawtooth30","sawtooth31","sawtooth32"]

    const filterTypeSet = ['lowpass', 'highpass']
    const rolloffSet = [-12, -24, -48, -96]

    const {
      name,
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue
    } = this.props

    return (
      <div className="Effect">
        <ToggleButton text="Auto Filter" on={on} handleClick={toggleEffect} />

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Wet</h2>
            <Slider
              name={name}
              property="wet"
              min="0"
              max="1"
              value={wet}
              handleValueChange={changeEffectWetValue}
            />

            <h2>Frequency</h2>
            <Slider
              name={name}
              property="frequency.value"
              min="0"
              max="100"
              value={effect.frequency.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Type</h2>
            <Select
              name={name}
              property="type"
              set={typeSet}
              value={effect.type}
              handleValueChange={changeEffectValue}
            />

            <h2>Depth</h2>
            <Slider
              name={name}
              property="depth.value"
              min="0"
              max="1"
              on={on}
              value={effect.depth.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Base Frequency</h2>
            <Slider
              name={name}
              property="baseFrequency"
              min="0"
              max="1800"
              value={effect.baseFrequency}
              handleValueChange={changeEffectValue}
            />

            <h2>Octaves</h2>
            <Slider
              name={name}
              property="octaves"
              min="0"
              max="6"
              on={on}
              value={effect.octaves}
              handleValueChange={changeEffectValue}
            />

            <h2>Filter</h2>
            <h2>Type</h2>
            <ButtonSet
              name={name}
              property="filter.type"
              set={filterTypeSet}
              value={effect.filter.type}
              handleValueChange={changeEffectValue}
            />

            <h2>Rolloff</h2>
            <ButtonSet
              name={name}
              property="filter.rolloff"
              set={rolloffSet}
              value={effect.filter.rolloff}
              handleValueChange={changeEffectValue}
            />

            <h2>Q</h2>
            <Slider
              name={name}
              property="filter.q"
              min="0"
              max="10"
              on={on}
              value={effect.filter.q}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
