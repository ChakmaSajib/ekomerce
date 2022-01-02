import { createContext } from 'react';

export const Store = createContext()

// Define Initial State
const initialState = {
    darkMode: false
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
}




