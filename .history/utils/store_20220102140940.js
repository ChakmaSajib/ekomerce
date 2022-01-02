import { createContext } from 'react';

export const Store = createContext()

// Define Initial State
const initialState = {
    darkMode: false
}

// Reducer function to handle the actions 
// here, action is responsibled to change the state 
function reducer(state, action) {

}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
}




