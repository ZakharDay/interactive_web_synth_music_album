import * as Tone from 'tone'

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
      {
        time: '0:0:0',
        noteName: 'F1',
        velocity: v,
        duration: d
      },
      {
        time: '1:0:0',
        noteName: 'A1',
        velocity: v,
        duration: d
      },
      {
        time: '2:0:0',
        noteName: 'C2',
        velocity: v,
        duration: d
      },
      {
        time: '3:0:0',
        noteName: 'E1',
        velocity: v,
        duration: d
      }
    ]
  )

  part.loop = true
  part.loopEnd = '4m'

  return part

  // let part = new Tone.Sequence(
  //   function (time, note) {
  //     synth.triggerAttackRelease(note, '2n.', time)
  //   },
  //   ['F1', 'A1', 'C2', 'E1'],
  //   '1n'
  // )
  //
  // return part
}

export { synth, autoFilter, part }
