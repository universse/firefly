export default function animate (
  prop,
  element,
  to,
  options = {
    ease: time => (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2,
    duration: 300
  },
  cb = () => {}
) {
  const { ease, duration } = options

  let start = null
  const from = element[prop]
  let cancelled = false

  const cancel = () => {
    cancelled = true
  }

  const step = timestamp => {
    if (cancelled) {
      cb(new Error('Animation cancelled'))
      return
    }

    if (start === null) {
      start = timestamp
    }
    const time = Math.min(1, (timestamp - start) / duration)

    element[prop] = ease(time) * (to - from) + from

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null)
      })
      return
    }

    requestAnimationFrame(step)
  }

  if (from === to) {
    cb(new Error('Element already at target position'))
    return cancel
  }

  requestAnimationFrame(step)
  return cancel
}
