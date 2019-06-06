import reducerRegistry from '../reducerRegistry'

function reducer (state = null, action) {
  switch (action.type) {
    case 'load-data':
      return action.payload.data
    default:
      return state
  }
}

reducerRegistry.register('normalizedColletions', reducer)
