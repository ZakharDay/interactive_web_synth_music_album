import * as Tone from 'tone'

// The type of the oscillator.
// Can be any of the basic types: sine, square, triangle, sawtooth.
// Or prefix the basic types with "fm", "am", or "fat"
// to use the FMOscillator, AMOscillator or FatOscillator types.
// The oscillator could also be set to "pwm" or "pulse".

function synth() {
  return new Tone.Synth({
    oscillator: {
      type: 'triangle'
    },
    envelope: {
      attack: 0.05050505050505051,
      decay: 0.3888888888888889,
      sustain: 0.24242424242424243,
      release: 0.006
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 40.40404040404041,
    type: 'sawtooth',
    depth: 0.06565656565656566,
    baseFrequency: 0,
    octaves: 0,
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 0
    }
  })

  f.wet.value = 0.494949494949495

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 18.68686868686869,
    delayTime: 0.000003686868686868687,
    depth: 0.196969696969697,
    type: 'triangle',
    spread: 30
  })

  f.wet.value = 0.5303030303030304

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.36868686868686873
  })

  f.wet.value = 0.18686868686868688

  return f
}

function part(synth) {
  const v = 0.4

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
        duration: '2n',
        velocity: v
      },
      {
        time: '0:0:2',
        noteName: 'A4',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:1:0',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:1:2',
        noteName: 'D5',
        duration: '1n',
        velocity: v
      },
      {
        time: '0:2:2',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '0:3:0',
        noteName: 'D5',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:0:0',
        noteName: 'C4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:2:0',
        noteName: 'E4',
        duration: '1n',
        velocity: v
      },
      {
        time: '1:3:0',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:0:0',
        noteName: 'C5',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:2:0',
        noteName: 'C4',
        duration: '1n',
        velocity: v
      },
      {
        time: '2:3:0',
        noteName: 'A4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:0:0',
        noteName: 'G4',
        duration: '1n',
        velocity: v
      },
      {
        time: '3:3:0',
        noteName: 'C5',
        duration: '2n',
        velocity: v
      },
      {
        time: '3:3:2',
        noteName: 'A4',
        duration: '2n',
        velocity: v
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export { part, synth, autoFilter, chorus, jcReverb }
