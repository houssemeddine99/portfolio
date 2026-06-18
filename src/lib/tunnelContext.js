import { createContext } from 'react'

// True when the screen you're currently flying to is the front/active one.
// Used to trigger each screen's entrance animations at exactly the right moment.
export const ActiveContext = createContext(false)
