import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleButton from '../controls/ToggleButton'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class PingPongDelay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      name,
      effect,
      on,
      wet,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue
    } = this.props

    return (
      <div className="Effect">
        <ToggleButton
          text="Ping Pong Delay"
          on={on}
          handleClick={toggleEffect}
        />

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

            <h2>Delay Time</h2>
            <Slider
              name={name}
              property="delayTime.value"
              min="0"
              max="1"
              value={effect.delayTime.value}
              handleValueChange={changeEffectValue}
            />

            <h2>Max Delay Time</h2>
            <Slider
              name={name}
              property="maxDelayTime"
              min="0"
              max="1"
              value={effect.maxDelayTime}
              handleValueChange={changeEffectValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
