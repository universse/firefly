import produce from 'immer'

export default function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'load':
        return payload || {}

      case 'saveClick':
        if (draft[payload.id]) {
          delete draft[payload.id]
        } else {
          draft[payload.id] = payload
        }
        break
    }
  })
}
