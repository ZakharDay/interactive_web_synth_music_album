import * as Tone from 'tone'

function synth() {
  return new Tone.PolySynth(Tone.Synth, {
    portamento: 0,
    detune: 0,
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 12.626262626262626,
      phase: 5.2020202020202015,
      fadeIn: 0.3
    },
    envelope: {
      attack: 0.196969696969697,
      decay: 0.5757575757575758,
      sustain: 0.7727272727272728,
      release: 2.474747474747475,
      attackCurve: 'ripple',
      decayCurve: 'exponential',
      releaseCurve: 'exponential'
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 73.23232323232324,
    type: 'sawtooth',
    depth: 1,
    baseFrequency: 616.1616161616162,
    octaves: 2.6,
    filter: {
      type: 'lowpass',
      rolloff: -24,
      Q: 0
    }
  })

  f.wet.value = 0.9494949494949496

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 16.161616161616163,
    delayTime: 0.00010101010101010101,
    depth: 0.2575757575757576,
    type: 'triangle',
    spread: 360
  })

  f.wet.value = 0.3

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0.5
  })

  f.wet.value = 0.32323232323232326

  return f
}

function introPart(synth) {
  const v = 1
  const d = '1n'

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
      // F: F A C
      {
        time: '0:0:0',
        noteName: 'F4',
        velocity: v,
        duration: d
      },
      {
        time: '0:0:0',
        noteName: 'A4',
        velocity: v,
        duration: d
      },
      {
        time: '0:0:0',
        noteName: 'C4',
        velocity: v,
        duration: d
      },
      // Am: A C E
      {
        time: '1:0:0',
        noteName: 'A4',
        velocity: v,
        duration: d
      },
      {
        time: '1:0:0',
        noteName: 'C5',
        velocity: v,
        duration: d
      },
      {
        time: '1:0:0',
        noteName: 'E4',
        velocity: v,
        duration: d
      },
      // C: C E G
      {
        time: '2:0:0',
        noteName: 'C4',
        velocity: v,
        duration: d
      },
      {
        time: '2:0:0',
        noteName: 'E4',
        velocity: v,
        duration: d
      },
      {
        time: '2:0:0',
        noteName: 'G4',
        velocity: v,
        duration: d
      },
      // Em: E G B
      {
        time: '3:0:0',
        noteName: 'E4',
        velocity: v,
        duration: d
      },
      {
        time: '3:0:0',
        noteName: 'G4',
        velocity: v,
        duration: d
      },
      {
        time: '3:0:0',
        noteName: 'B4',
        velocity: v,
        duration: d
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part
}

export { synth, autoFilter, chorus, jcReverb, introPart }
