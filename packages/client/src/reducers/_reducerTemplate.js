import reducerRegistry from '../reducerRegistry'

function reducer (state = null, action) {
  switch (action.type) {
    default:
      return state
  }
}

reducerRegistry.register('NAME', reducer)
