import * as Tone from 'tone'

function synth() {
  return new Tone.Synth({
    oscillator: {
      type: 'pwm'
    },
    envelope: {
      attack: 0.03535353535353536,
      decay: 0.4545454545454546,
      sustain: 0.696969696969697,
      release: 0.5757575757575758
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 75.25252525252526,
    type: 'sine',
    depth: 0.6666666666666667,
    baseFrequency: 489,
    octaves: 0,
    // octaves: 1.6363636363636365
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 0
    }
  })

  f.wet.value = 0.8333333333333334

  return f
}

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 0,
    type: 'sine',
    depth: 0.5,
    spread: 180
  })

  // f.wet.value = 0

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 0,
    depth: 0.1,
    type: 'sine'
  })

  // f.wet.value = 0

  return f
}

// StereoEffect ???
// StereoFeedbackEffect ???

function stereoWidener() {
  let f = new Tone.StereoWidener({
    width: 0.5
  })

  // f.wet.value = 0

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.05
  })

  // f.wet.value = 0

  return f
}

function distortion() {
  let f = new Tone.Distortion({
    distortion: 2.121212121212121,
    oversample: '4x'
  })

  f.wet.value = 0.24242424242424243

  return f
}

function part(synth) {
  const v = 1

  const part = new Tone.Part(
    function (time, note) {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    },
    [
      {
        time: '0:0:0',
        noteName: 'F4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:0:1',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:0:3',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:0',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:1:0.5',
        noteName: 'C5',
        // noteName: 'C#5',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:1:1',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:1:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:0',
        noteName: 'F4',
        // noteName: 'F#4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:2:0.5',
        noteName: 'E4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:2:1',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:3',
        noteName: 'D4',
        // noteName: 'D#4',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:3:1',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:1.5',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:2',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '0:3:2.5',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:0:0',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:1',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:0',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:1',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:2',
        noteName: 'B4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:1:3',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:2:0',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:0.5',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:1',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:2:1.5',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '1:3:1',
        noteName: 'F4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:3:2',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:0:0',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:0.5',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:1',
        noteName: 'A4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:1.5',
        noteName: 'G4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:2',
        noteName: 'B4',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:0:3',
        noteName: 'C5',
        duration: '1n',
        // 0.5
        velocity: v
      },
      {
        time: '2:1:0',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:1:1',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:1:2',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:1',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:3',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:1',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:3',
        noteName: 'D4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:0:1',
        noteName: 'C4',
        duration: '1n',
        velocity: v
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export {
  synth,
  autoFilter,
  tremolo,
  vibrato,
  distortion,
  stereoWidener,
  jcReverb,
  part
}
