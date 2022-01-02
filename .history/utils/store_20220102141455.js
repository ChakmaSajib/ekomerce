import { createContext, useReducer } from 'react';

export const Store = createContext()

// Define Initial State
const initialState = {
    darkMode: false
}

// Reducer function to handle actions 
// here, action is responsibled to change the state 
function reducer(state, action) {
    switch (action.type) {
        case "DARK_MODE_ON":
            return {
                ...state, darkMode: true
            }
        case "DARK_MODE_OFF":
            return {
                ...state, darkMode: false
            }
        default:
            return state
    }


}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
}




