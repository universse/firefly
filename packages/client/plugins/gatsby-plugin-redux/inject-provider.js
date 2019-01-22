import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './configure-store'

const preloadedState = { test: 'test' }
const store = configureStore(preloadedState)

export default ({ element }) => <Provider store={store}>{element}</Provider>
