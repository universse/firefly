function animate ({
  element,
  prop,
  func,
  from,
  to,
  options: {
    ease = time => (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2,
    duration = 300
  } = {},
  cb = () => {}
}) {
  let start = null
  from = element ? element[prop] : from
  let cancelled = false
  const diff = to - from

  const cancel = () => (cancelled = true)

  if (from === to) {
    return cancel
  }

  requestAnimationFrame(function step (timestamp) {
    if (cancelled) return

    start === null && (start = timestamp)

    const time = Math.min(1, (timestamp - start) / duration)

    const current = ease(time) * diff + from

    element ? (element[prop] = current) : func(current)

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb()
      })
      return
    }

    requestAnimationFrame(step)
  })

  return cancel
}

module.exports = animate
