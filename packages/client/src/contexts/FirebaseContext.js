import { createContext } from 'react'

import firebase from '../services/firebase'

const FirebaseContext = createContext(firebase)

export default FirebaseContext
