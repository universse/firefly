import { createContext } from 'react'

import worker from './worker'

const FirebaseContext = createContext(worker)

export default FirebaseContext
