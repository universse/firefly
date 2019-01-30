export default function reducer (state, { type, payload }) {
  switch (type) {
    case 'load':
      return payload || {}

    case 'saveClick':
      if (state[payload.id]) {
        const newState = { ...state }
        delete newState[payload.id]
        return newState
      }
      return { ...state, [payload.id]: payload }

    default:
      return state
  }
}
