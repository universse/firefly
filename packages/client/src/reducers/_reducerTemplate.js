import reducerRegistry from '../reducerRegistry'

const reducerName = 'NAME'

function reducer (state = null, action) {
  switch (action.type) {
    default:
      return state
  }
}

reducerRegistry.register(reducerName, reducer)
