function areShallowlyEqual (prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false
  }

  const length = prev.length

  for (let i = 0; i < length; i++) {
    if (prev[i] !== next[i]) {
      return false
    }
  }

  return true
}

export default function memoize (func) {
  let lastArgs = null
  let lastResult = null

  return function () {
    !areShallowlyEqual(lastArgs, arguments) &&
      (lastResult = func.apply(null, arguments))

    lastArgs = arguments

    return lastResult
  }
}
