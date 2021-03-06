import _, { merge } from 'lodash'
import React from 'react'
import * as Tone from 'tone'
let unmuteAudio = require('unmute-ios-audio')

import * as drums from '../tunes/drums'
import * as drumLoops from '../tunes/drum-loops'
import * as samples from '../tunes/samples'
import * as synths from '../tunes/synths'
import * as effects from '../tunes/effects'
import * as utilities from '../tunes/utilities'

import * as bassSynthTunes from '../tunes/p-bass-synth'
import * as highSynthTunes from '../tunes/p-high-synth'
import * as lightSynthTunes from '../tunes/p-light-synth'
import * as soloSynthTunes from '../tunes/p-solo-synth'

import Channel from '../components/utilities/Channel'

import Drum from '../components/synths/Drum'

import AutoFilter from '../components/effects/AutoFilter'
import AutoPanner from '../components/effects/AutoPanner'
import AutoWah from '../components/effects/AutoWah'
import BitCrusher from '../components/effects/BitCrusher'
import Chebyshev from '../components/effects/Chebyshev'
import Chorus from '../components/effects/Chorus'
import Distortion from '../components/effects/Distortion'
import FeedbackDelay from '../components/effects/FeedbackDelay'
import FeedbackEffect from '../components/effects/FeedbackEffect'
import Freeverb from '../components/effects/Freeverb'
import JcReverb from '../components/effects/JcReverb'
import Phaser from '../components/effects/Phaser'
import PingPongDelay from '../components/effects/PingPongDelay'
import PitchShift from '../components/effects/PitchShift'
import Reverb from '../components/effects/Reverb'
import StereoWidener from '../components/effects/StereoWidener'
import Tremolo from '../components/effects/Tremolo'
import Vibrato from '../components/effects/Vibrato'

import MembraneSynth from '../components/synths/MembraneSynth'
import ToneSynth from '../components/synths/ToneSynth'
import NoiseSynth from '../components/synths/NoiseSynth'
import PolySynth from '../components/synths/PolySynth'

// import Chorus from '../components/effects/Chorus'
// import Phaser from '../components/effects/Phaser'

let bpm = 90
const defaultWetValue = 1

let bassSynthChannel = utilities.channel(-15)
let lightSynthChannel = utilities.channel(-14)
let soloSynthChannel = utilities.channel(-10)
let highSynthChannel = utilities.channel(-8)

let kickDrum = drums.kickDrum()
let snareHit = drums.snareHit()
let highhat = drums.highhat().toDestination()
let snareMembrane = drums.snareMembrane()
let snareEQ = new Tone.EQ3(-10, 0, -10).toDestination()
// let convolver = new Tone.Convolver(samples.hall).toDestination()

// convolver.wet.value = 0.1
// kickDrum.connect(convolver)
kickDrum.toDestination()
snareMembrane.chain(snareEQ)
snareHit.chain(snareEQ)

let drumLoop1Kick = drumLoops.kick1(kickDrum)
let drumLoop1Snare = drumLoops.snare1(snareHit, snareMembrane)
let drumLoop1Hat = drumLoops.hat1(highhat)

let drumLoop2Kick = drumLoops.kick2(kickDrum)
let drumLoop2Snare = drumLoops.snare2(snareHit, snareMembrane)
let drumLoop2Hat = drumLoops.hat2(highhat)

let drumLoop3Kick = drumLoops.kick3(kickDrum)
let drumLoop3Hat = drumLoops.hat3(highhat)

let drumLoop4Kick = drumLoops.kick4(kickDrum)

let lightSynth = lightSynthTunes.synth()
let lightSynthFilter = lightSynthTunes.autoFilter()
let lightSynthReverb = lightSynthTunes.jcReverb()
let lightSynthChorus = lightSynthTunes.chorus()
let lightSynthPart = lightSynthTunes.introPart(lightSynth)

console.log(lightSynth.get())

lightSynth.chain(
  lightSynthFilter,
  lightSynthReverb,
  lightSynthChorus,
  lightSynthChannel
)

let bassSynth = bassSynthTunes.synth()
let bassSynthFilter = bassSynthTunes.autoFilter()
let bassSynthPart = bassSynthTunes.part(bassSynth)
bassSynth.chain(bassSynthFilter, bassSynthChannel)

let soloSynth = soloSynthTunes.synth()
let soloSynthFilter = soloSynthTunes.autoFilter()
let soloSynthChorus = soloSynthTunes.chorus()
let soloSynthReverb = soloSynthTunes.jcReverb()
let soloSynthPart = soloSynthTunes.part(soloSynth)

soloSynth.chain(
  soloSynthFilter,
  soloSynthChorus,
  soloSynthReverb,
  soloSynthChannel
)

let highSynth = highSynthTunes.synth()
let highSynthFilter = highSynthTunes.autoFilter()
let highSynthTremolo = highSynthTunes.tremolo()
let highSynthVibrato = highSynthTunes.vibrato()
let highSynthDistortion = highSynthTunes.distortion()
let highSynthPart = highSynthTunes.part(highSynth)

highSynth.chain(
  highSynthFilter,
  highSynthTremolo,
  highSynthVibrato,
  highSynthDistortion,
  highSynthChannel
)

let keysOctave = 3

export default class Single extends React.Component {
  constructor(props) {
    super(props)

    this.kickCircle = React.createRef()
    this.snareCircle = React.createRef()

    // drumLoop1Kick = drumLoops.kick1(kickDrum, this.hitKickDrumCircle)
    // // prettier-ignore
    // drumLoop1Snare = drumLoops.snare1(snareHit, snareMembrane, this.hitSnareDrumCircle)
    // drumLoop1Hat = drumLoops.snare3(highhat)

    this.state = {
      drums: {
        kick: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Kick, drumLoop2Kick, drumLoop3Kick, drumLoop4Kick]
        },
        snare: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Snare, drumLoop2Snare]
        },
        hat: {
          part: 0,
          on: false,
          volume: 10,
          parts: [drumLoop1Hat, drumLoop2Hat, drumLoop3Hat]
        }
      },
      lightSynth,
      bassSynth,
      soloSynth,
      highSynth,
      bassSynthFilter: {
        name: 'bassSynthFilter',
        effect: bassSynthFilter,
        wet: bassSynthFilter.wet.value,
        on: true
      },
      bassSynthChannel: {
        name: 'bassSynthChannel',
        channel: bassSynthChannel,
        pan: bassSynthChannel.pan.value,
        volume: bassSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      lightSynthFilter: {
        name: 'lightSynthFilter',
        effect: lightSynthFilter,
        wet: lightSynthFilter.wet.value,
        on: true
      },
      lightSynthReverb: {
        name: 'lightSynthReverb',
        effect: lightSynthReverb,
        wet: lightSynthReverb.wet.value,
        on: false
      },
      lightSynthChorus: {
        name: 'lightSynthChorus',
        effect: lightSynthChorus,
        wet: lightSynthChorus.wet.value,
        on: false
      },
      lightSynthChannel: {
        name: 'lightSynthChannel',
        channel: lightSynthChannel,
        pan: lightSynthChannel.pan.value,
        volume: lightSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      soloSynthFilter: {
        name: 'soloSynthFilter',
        effect: soloSynthFilter,
        wet: soloSynthFilter.wet.value,
        on: true
      },
      soloSynthChorus: {
        name: 'soloSynthChorus',
        effect: soloSynthChorus,
        wet: soloSynthChorus.wet.value,
        on: true
      },
      soloSynthReverb: {
        name: 'soloSynthReverb',
        effect: soloSynthReverb,
        wet: soloSynthReverb.wet.value,
        on: true
      },
      soloSynthChannel: {
        name: 'soloSynthChannel',
        channel: soloSynthChannel,
        pan: soloSynthChannel.pan.value,
        volume: soloSynthChannel.volume.value,
        mute: false,
        solo: false
      },
      highSynthFilter: {
        name: 'highSynthFilter',
        effect: highSynthFilter,
        wet: highSynthFilter.wet.value,
        on: true
      },
      highSynthTremolo: {
        name: 'highSynthTremolo',
        effect: highSynthTremolo,
        wet: highSynthTremolo.wet.value,
        on: false
      },
      highSynthVibrato: {
        name: 'highSynthVibrato',
        effect: highSynthVibrato,
        wet: highSynthVibrato.wet.value,
        on: true
      },
      highSynthDistortion: {
        name: 'highSynthDistortion',
        effect: highSynthDistortion,
        wet: highSynthDistortion.wet.value,
        on: true
      },
      highSynthChannel: {
        name: 'highSynthChannel',
        channel: highSynthChannel,
        pan: highSynthChannel.pan.value,
        volume: highSynthChannel.volume.value,
        mute: false,
        solo: false
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)

    this.setupEffect('bassSynthFilter')
    this.setupEffect('lightSynthFilter')
    this.setupEffect('lightSynthReverb')
    this.setupEffect('lightSynthChorus')
    this.setupEffect('soloSynthFilter')
    this.setupEffect('soloSynthChorus')
    this.setupEffect('soloSynthReverb')
    this.setupEffect('highSynthTremolo')
    this.setupEffect('highSynthVibrato')
    this.setupEffect('highSynthDistortion')
  }

  // handleTogglePlay = () => {
  //   let { room, instruments, transportIsOn, transportScheduleId } = this.state
  //
  //   if (transportIsOn) {
  //     Tone.Transport.pause()
  //     Tone.Transport.clear(transportScheduleId)
  //     transportIsOn = false
  //
  //     // clearInterval(this.loopIntervallCall)
  //   } else {
  //     Tone.Transport.bpm.value = room.tempo
  //     Tone.Transport.start()
  //
  //     // this.loopIntervalCall = setInterval(() => this.nextSixteenth(), 1000 / 30)
  //
  //     transportScheduleId = Tone.Transport.scheduleRepeat(
  //       this.nextMeasure,
  //       '1n'
  //     )
  //
  //     transportIsOn = true
  //   }
  //
  //   const oldInstruments = instruments
  //   let newInstruments = []
  //
  //   instruments.forEach((instrument, i) => {
  //     let newInstrument = {
  //       id: instrument.id,
  //       kind: instrument.kind,
  //       name: instrument.name,
  //       webaudioPart: this.updatePart(instrument, instrument),
  //       parts: [...instrument.parts]
  //     }
  //
  //     oldInstruments.forEach((oldInstrument, i) => {
  //       if (instrument.id === oldInstrument.id) {
  //         newInstrument.webaudio = oldInstrument.webaudio
  //         newInstrument.channel = { webaudio: oldInstrument.channel.webaudio }
  //         newInstrument.effects = oldInstrument.effects
  //       }
  //     })
  //
  //     newInstruments.push(newInstrument)
  //   })
  //
  //   this.setState({
  //     transportIsOn,
  //     transportScheduleId,
  //     instruments: newInstruments
  //   })
  // }

  // nextMeasure(now) {
  //   const { toggleDrum, changeDrumLoop } = this
  //   const p = Tone.Transport.position
  //   const regexBefore = /([\w]+)/
  //   let measure = p.match(regexBefore)[1]
  //   console.log('Next measure ' + measure)
  //
  //   switch (measure) {
  //     case '0':
  //       // start light synth
  //       lightSynthPart.mute = false
  //       break
  //
  //     case '16':
  //       // start bass synth
  //       bassSynthPart.mute = false
  //       break
  //
  //     case '20':
  //       // start hat loop 1
  //       toggleDrum('hat')
  //       break
  //
  //     case '24':
  //       // start kick and snare
  //       toggleDrum('kick')
  //       toggleDrum('snare')
  //       break
  //
  //     case '32':
  //       // start solo synth
  //       soloSynthPart.mute = false
  //       break
  //
  //     case '44':
  //       // stop solo synth
  //       soloSynthPart.mute = true
  //       // start kick loop 2
  //       changeDrumLoop('kick', 1)
  //       // start snare loop 2
  //       changeDrumLoop('snare', 1)
  //       break
  //
  //     case '56':
  //       // start solo synth
  //       soloSynthPart.mute = false
  //       // start kick loop 1
  //       changeDrumLoop('kick', 0)
  //       // start snare loop 1
  //       changeDrumLoop('snare', 0)
  //       break
  //
  //     case '72':
  //       // stop solo synth
  //       soloSynthPart.mute = true
  //       // start high synth
  //       highSynthPart.mute = false
  //       // start kick loop 2
  //       changeDrumLoop('kick', 1)
  //       // start snare loop 2
  //       changeDrumLoop('snare', 1)
  //       // how to make sound tuning
  //       // ???
  //       break
  //
  //     case '88':
  //       // start kick loop 3
  //       changeDrumLoop('kick', 2)
  //       // start hat loop 2
  //       changeDrumLoop('hat', 1)
  //       break
  //
  //     case '96':
  //       // stop kick
  //       toggleDrum('kick')
  //       // stop snare
  //       toggleDrum('snare')
  //       break
  //
  //     case '98':
  //       // stop hat
  //       toggleDrum('hat')
  //       break
  //
  //     case '100':
  //       // start snare loop 2
  //       changeDrumLoop('snare', 1)
  //       toggleDrum('snare')
  //       break
  //
  //     case '104':
  //       // stop high synth
  //       highSynthPart.mute = true
  //       // start solo synth
  //       soloSynthPart.mute = false
  //       // start kick loop 4
  //       changeDrumLoop('kick', 3)
  //       toggleDrum('kick')
  //       // start hat loop 3
  //       changeDrumLoop('hat', 2)
  //       toggleDrum('hat')
  //       break
  //
  //     case '120':
  //       // start high synth
  //       highSynthPart.mute = false
  //       // stop solo synth
  //       soloSynthPart.mute = true
  //       // stop kick
  //       toggleDrum('kick')
  //       // stop snare
  //       toggleDrum('snare')
  //       // stop hat
  //       toggleDrum('hat')
  //       break
  //
  //     case '128':
  //       // stop light synth
  //       lightSynthPart.mute = true
  //       // stop high synth
  //       highSynthPart.mute = true
  //       // how to move sliders
  //       // ???
  //       break
  //
  //     case '144':
  //       // start solo synth
  //       soloSynthPart.mute = false
  //       // start light synth
  //       lightSynthPart.mute = false
  //       break
  //
  //     case '148':
  //       // start kick loop 4
  //       changeDrumLoop('kick', 3)
  //       toggleDrum('kick')
  //       // start snare loop 2
  //       changeDrumLoop('snare', 1)
  //       toggleDrum('snare')
  //       // start hat loop 3
  //       changeDrumLoop('hat', 2)
  //       toggleDrum('hat')
  //       break
  //
  //     case '164':
  //       // start high synth
  //       highSynthPart.mute = false
  //       // stop solo synth
  //       soloSynthPart.mute = true
  //       // stop light synth
  //       lightSynthPart.mute = true
  //       // stop bass synth
  //       bassSynthPart.mute = true
  //       // stop kick
  //       toggleDrum('kick')
  //       // stop snare
  //       toggleDrum('snare')
  //       // stop hat
  //       toggleDrum('hat')
  //       break
  //
  //     case '166':
  //       // start light synth
  //       lightSynthPart.mute = false
  //       break
  //
  //     case '168':
  //       // stop high synth
  //       highSynthPart.mute = true
  //       // stop light synth
  //       lightSynthPart.mute = true
  //       // start hat loop 3
  //       toggleDrum('hat')
  //       break
  //
  //     case '169':
  //       // stop hat
  //       toggleDrum('hat')
  //       break
  //   }
  // }

  handleStart = () => {
    // unmuteAudio()
    Tone.Transport.bpm.value = bpm
    // Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')
    Tone.Transport.start()

    // this.state.drums.kick.parts[0].mute = true
    // this.state.drums.kick.parts[0].start()

    // this.state.drums.kick.parts.map((part) => {
    //   part.mute = true
    //   part.start()
    // })
    //
    // this.state.drums.snare.parts.map((part) => {
    //   part.mute = true
    //   part.start()
    // })
    //
    // this.state.drums.hat.parts.map((part) => {
    //   part.mute = true
    //   part.start()
    // })

    lightSynthPart.mute = true
    bassSynthPart.mute = true
    soloSynthPart.mute = true
    highSynthPart.mute = true

    lightSynthPart.start()
    bassSynthPart.start()
    soloSynthPart.start()
    highSynthPart.start()

    this.setupDrums('kick')
    this.setupDrums('snare')
    this.setupDrums('hat')
    // unmuteAudio()
  }

  handleKeydown = (e) => {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 70:
        console.log('f')
        snareHit.triggerAttackRelease('16n')
        snareMembrane.triggerAttackRelease('E1', '16n')
        break
      case 71:
        console.log('g')
        // highhat.triggerAttackRelease(51, '16n', 1)
        highhat.triggerAttackRelease('16n')
        break
      case 72:
        console.log('h')
        kickDrum.triggerAttackRelease('G0', '16n')
        break
      case 32:
        console.log('space')
        this.handleStart()

        // this.state.drums.kick
        //
        // let { part, on, parts } = this.state.drums
        //
        // if (on == true) {
        //   parts.map((p, i) => {
        //     if (i == part) {
        //       p.mute = false
        //     } else {
        //       p.mute = true
        //     }
        //
        //     p.start()
        //   })
        // }
        break
      case 49:
        lightSynthPart.mute = !lightSynthPart.mute
        break
      case 50:
        bassSynthPart.mute = !bassSynthPart.mute
        break
      case 51:
        this.toggleDrum('kick')
        break
      case 52:
        this.toggleDrum('snare')
        break
      case 53:
        this.toggleDrum('hat')
        break
      case 81:
        soloSynthPart.mute = !soloSynthPart.mute
        break
      case 87:
        highSynthPart.mute = !highSynthPart.mute
        break
      case 84:
        this.toggleNote('C' + keysOctave)
        break
      case 54:
        this.toggleNote('C#' + keysOctave)
        break
      case 89:
        this.toggleNote('D' + keysOctave)
        break
      case 55:
        this.toggleNote('D#' + keysOctave)
        break
      case 85:
        this.toggleNote('E' + keysOctave)
        break
      // case 56:
      // this.toggleNote('E3')
      // break
      case 73:
        this.toggleNote('F' + keysOctave)
        break
      case 57:
        this.toggleNote('F#' + keysOctave)
        break
      case 79:
        this.toggleNote('G' + keysOctave)
        break
      case 48:
        this.toggleNote('G#' + keysOctave)
        break
      case 80:
        this.toggleNote('A' + keysOctave)
        break
      case 173:
        this.toggleNote('A#' + keysOctave)
        break
      case 219:
        this.toggleNote('B' + keysOctave)
        break
      // case 61:
      case 221:
        this.toggleNote('C' + (keysOctave + 1))
        break
    }
  }

  handleKeyup = () => {
    this.stopNote()
  }

  setupDrums = (drumName) => {
    let { part, on, parts } = this.state.drums[drumName]

    if (on == true) {
      parts.map((p, i) => {
        if (i == part) {
          p.mute = false
        } else {
          p.mute = true
        }

        p.start()
      })
    }
  }

  toggleDrum = (drumName) => {
    let { drums } = this.state
    let { part, on, volume, parts } = drums[drumName]

    parts.map((p, i) => {
      if (on == true) {
        p.mute = true
        // p.clear()
        p.cancel()
        p.stop()
      } else {
        if (i == part) {
          p.mute = false
          p.start()
        }
      }
    })

    drums[drumName]['part'] = part
    drums[drumName]['on'] = !on
    drums[drumName]['volume'] = volume
    drums[drumName]['parts'] = parts

    merge({}, this.state.drums, drums)

    this.setState({
      drums
    })
  }

  changeDrumLoop = (drumName, partNumber) => {
    let { drums } = this.state
    let { part, on, volume, parts } = drums[drumName]

    parts.map((p, i) => {
      if (i == partNumber) {
        if (on == true) {
          p.mute = false
        }
      } else {
        p.mute = true
      }
    })

    drums[drumName]['part'] = partNumber
    drums[drumName]['on'] = on
    drums[drumName]['volume'] = volume
    drums[drumName]['parts'] = parts

    merge({}, this.state.drums, drums)

    this.setState({
      drums
    })
  }

  changeSynthValue = (synthName, effectName, value) => {
    // console.log('test', synthName, effectName, value)

    let synth = this.state[synthName]

    if (synthName == 'lightSynth') {
      let regexBefore = /(.*)\./
      let regexAfter = /\.(.*)/
      let regexArrayKey = /\[([0-9]+)\]/
      let regexDropArrayKey = /\](.*)/

      let effectNameNamespace = effectName
        .match(regexBefore)[1]
        .match(regexDropArrayKey)[1]
      let effectNameInNamespace = effectName.match(regexAfter)[1]
      let arrayKey = parseInt(
        effectName.match(regexBefore)[1].match(regexArrayKey)[1]
      )

      if (effectNameNamespace == 'oscillator') {
        // synth.voices.forEach((voice) => {
        //   voice.oscillator[effectNameInNamespace] = value
        // })

        synth.voices[arrayKey].oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.voices.forEach((voice) => {
          voice.envelope[effectNameInNamespace] = value
        })

        // synth.voices[arrayKey].envelope[effectNameInNamespace] = value
      }
    } else if (
      synthName == 'bassSynth' ||
      synthName == 'soloSynth' ||
      synthName == 'highSynth'
    ) {
      let regexBefore = /(.*)\./
      let regexAfter = /\.(.*)/
      let effectNameNamespace = effectName.match(regexBefore)[1]
      let effectNameInNamespace = effectName.match(regexAfter)[1]

      if (effectNameNamespace == 'oscillator') {
        synth.oscillator[effectNameInNamespace] = value
      } else if (effectNameNamespace == 'envelope') {
        synth.envelope[effectNameInNamespace] = value
      }
    } else {
      synth[effectName] = value
    }

    this.setState({
      [`${synthName}`]: synth
    })
  }

  setupEffect = (effectName) => {
    let { name, effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? wet : 0

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  toggleEffect = (effectName) => {
    let { name, effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? 0 : wet

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on: !on
      }
    })
  }

  changeEffectWetValue = (effectName, effectProperty, value) => {
    let { name, effect, wet, on } = this.state[effectName]

    effect[effectProperty].value = on == true ? value : 0
    wet = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectValue = (effectName, effectProperty, value) => {
    let { name, effect, wet, on } = this.state[effectName]

    if (effectProperty == 'order') {
      value = Math.round(value)
    }

    let regexBefore = /(.*)\./
    let regexAfter = /\.(.*)/
    let effectPropertyNamespaceRegexResult = effectProperty.match(regexBefore)

    console.log(effectName, effectProperty, value)

    if (effectPropertyNamespaceRegexResult != null) {
      let effectPropertyNamespace = effectProperty.match(regexBefore)[1]
      let effectPropertyInNamespace = effectProperty.match(regexAfter)[1]

      console.log(
        effectPropertyNamespaceRegexResult,
        effectPropertyNamespace,
        effect[effectPropertyNamespace]
      )

      if (effectPropertyNamespace == 'filter') {
        effect.filter[effectPropertyInNamespace] = value
      } else {
        effect[effectPropertyNamespace].value = value
      }
    } else {
      effect[effectProperty] = value
    }

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeChannelValue = (channelName, valueName, value) => {
    // console.log(channelName, valueName, value)
    let { name, channel, pan, volume, mute, solo } = this.state[channelName]
    let shouldComponentUpdate = false

    channel[valueName].value = value

    if (valueName == 'pan') {
      if (pan != value) {
        pan = value
        shouldComponentUpdate = true
      }
    }

    if (valueName == 'volume') {
      if (volume != value) {
        volume = value
        shouldComponentUpdate = true
      }
    }

    if (shouldComponentUpdate) {
      this.setState({
        [`${channelName}`]: {
          name,
          channel,
          pan,
          volume,
          mute,
          solo
        }
      })
    }
  }

  toggleChannelValue = (channelName, valueName) => {
    let { name, channel, pan, volume, mute, solo } = this.state[channelName]
    // channel[valueName] = !channel[valueName]

    console.log('value', channel[valueName], 'muted', channel.muted)
    console.log('mute', mute, 'solo', solo)

    if (valueName == 'mute') {
      channel.mute = !mute
      mute = !mute
    }

    if (valueName == 'solo') {
      channel.solo = !solo
      solo = !solo
    }

    console.log('value', channel[valueName], 'muted', channel.muted)
    console.log('mute', mute, 'solo', solo)

    this.setState({
      [`${channelName}`]: {
        name,
        channel,
        pan,
        volume,
        mute,
        solo
      }
    })
  }

  toggleNote = (note) => {
    lightSynth.triggerAttack(note, '16n')
  }

  stopNote = () => {
    lightSynth.triggerRelease()
  }

  render() {
    return (
      <div>
        <div
          className="StartButton"
          onClick={() => this.handleStart()}
          onTouchStart={() => this.handleStart()}
        >
          Start
        </div>

        <div className="drumRack">
          <Drum
            name="kick"
            on={this.state.drums.kick.on}
            part={this.state.drums.kick.part}
            parts={this.state.drums.kick.parts}
            toggleDrum={this.toggleDrum}
            changeDrumLoop={this.changeDrumLoop}
          />

          <Drum
            name="snare"
            on={this.state.drums.snare.on}
            part={this.state.drums.snare.part}
            parts={this.state.drums.snare.parts}
            toggleDrum={this.toggleDrum}
            changeDrumLoop={this.changeDrumLoop}
          />

          <Drum
            name="hat"
            on={this.state.drums.hat.on}
            part={this.state.drums.hat.part}
            parts={this.state.drums.hat.parts}
            toggleDrum={this.toggleDrum}
            changeDrumLoop={this.changeDrumLoop}
          />
        </div>

        <div className="effectsBoard">
          <PolySynth
            text="Light Synth"
            synth="lightSynth"
            instrument={this.state.lightSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.lightSynthFilter}
            toggleEffect={() => this.toggleEffect('lightSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.lightSynthReverb}
            toggleEffect={() => this.toggleEffect('lightSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chorus
            {...this.state.lightSynthChorus}
            toggleEffect={() => this.toggleEffect('lightSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.lightSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="Bass Synth"
            synth="bassSynth"
            instrument={this.state.bassSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.bassSynthFilter}
            toggleEffect={() => this.toggleEffect('bassSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.bassSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="Solo Synth"
            synth="soloSynth"
            instrument={this.state.soloSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.soloSynthFilter}
            toggleEffect={() => this.toggleEffect('soloSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Chorus
            {...this.state.soloSynthChorus}
            toggleEffect={() => this.toggleEffect('soloSynthChorus')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <JcReverb
            {...this.state.soloSynthReverb}
            toggleEffect={() => this.toggleEffect('soloSynthReverb')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.soloSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>

        <div className="effectsBoard">
          <ToneSynth
            text="High Synth"
            synth="highSynth"
            instrument={this.state.highSynth}
            on=""
            togglePlay=""
            changeSynthValue={this.changeSynthValue}
          />
          <AutoFilter
            {...this.state.highSynthFilter}
            toggleEffect={() => this.toggleEffect('highSynthFilter')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Tremolo
            {...this.state.highSynthTremolo}
            toggleEffect={() => this.toggleEffect('highSynthTremolo')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Vibrato
            {...this.state.highSynthVibrato}
            toggleEffect={() => this.toggleEffect('highSynthVibrato')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Distortion
            {...this.state.highSynthDistortion}
            toggleEffect={() => this.toggleEffect('highSynthDistortion')}
            changeEffectWetValue={this.changeEffectWetValue}
            changeEffectValue={this.changeEffectValue}
          />
          <Channel
            {...this.state.highSynthChannel}
            changeChannelValue={this.changeChannelValue}
            toggleChannelValue={this.toggleChannelValue}
          />
        </div>
      </div>
    )
  }
}
