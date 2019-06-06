function getReducerRegistry () {
  let reducers = {}
  let onChangeListener

  function getReducers () {
    return { ...reducers }
  }

  return {
    getReducers,
    register (name, reducer) {
      reducers = { ...reducers, [name]: reducer }
      onChangeListener && onChangeListener(getReducers())
    },
    setChangeListener (listener) {
      onChangeListener = listener
    }
  }
}

export default getReducerRegistry()
