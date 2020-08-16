import Tone from 'tone'

function synth() {
  return new Tone.Synth({
    oscillator: {
      type: 'pwm',
      modulationFrequency: 0.6
    },
    envelope: {
      attack: 0.020202020202020204,
      decay: 0.29292929292929293,
      sustain: 0.6767676767676768,
      release: 0.15656565656565657
    }
  })
}

function autoFilter() {
  let f = new Tone.AutoFilter({
    frequency: 75.25252525252526,
    type: 'sine',
    depth: 0.6666666666666667,
    baseFrequency: 186.86868686868686,
    octaves: 0,
    // octaves: 1.6363636363636365
    filter: {
      type: 'lowpass',
      rolloff: -12,
      Q: 0
    }
  })

  f.wet.value = 0.37373737373737376

  return f
}

function part(synth) {
  let part = new Tone.Sequence(
    function (time, note) {
      synth.triggerAttackRelease(note, '2n.', time)
    },
    ['F1', 'A1', 'C2', 'E1'],
    '1n'
  )

  return part
}

export { synth, autoFilter, part }
