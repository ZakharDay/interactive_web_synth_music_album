import Tone from 'tone'

function polySynth() {
  return new Tone.PolySynth(3, Tone.Synth, {
    oscillator: {
      type: 'fatsawtooth',
      count: 7,
      spread: 30,
      phase: 80,
      fadeIn: 0.3
    },
    envelope: {
      attack: 0.12626262626262627,
      decay: 0.393939393939394,
      sustain: 0.8,
      release: 5,
      attackCurve: 'exponential'
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 1,
    type: 'triangle',
    depth: 1,
    baseFrequency: 520.2020202020202,
    octaves: 2.6,
    filter: {
      type: 'lowpass',
      rolloff: -24,
      Q: 0
    }
  })

  f.wet.value = 0.5353535353535354

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
  const v = 0.2
  const d = '4n'

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

export { introPart, polySynth, autoFilter, chorus, jcReverb }
