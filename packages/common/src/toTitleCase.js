const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|so|the|to|v.?|vs.?|via|with)$/i
const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/
const wordSeparators = /([ :–—-])/

function toTitleCase (str) {
  return str
    .split(wordSeparators)
    .map(function (current, index, array) {
      if (
        current.search(smallWords) > -1 &&
        index !== 0 &&
        index !== array.length - 1 &&
        array[index - 3] !== ':' &&
        array[index + 1] !== ':' &&
        array[index - 2] !== '|' &&
        (array[index + 1] !== '-' ||
          (array[index - 1] === '-' && array[index + 1] === '-'))
      ) {
        return current.toLowerCase()
      }

      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current
      }

      if (array[index + 1] === ':' && array[index + 2] !== '') {
        return current
      }

      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase()
      })
    })
    .join('')
}

module.exports = toTitleCase
