import Downshift from 'downshift'

export default function stateReducer (state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.blurInput:
    case Downshift.stateChangeTypes.mouseUp:
      return { isOpen: false }
    default:
      return changes
  }
}
