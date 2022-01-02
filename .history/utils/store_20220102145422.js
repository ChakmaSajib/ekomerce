import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

/**
 *  Steps:
 *   1. initial state
 *   2. define reducer function to handle actions so that we can manipulate - state
 *   3. create context variable so that we can pass value as a pros init 
 *   4. define Store provider to make it wrapper and to return - Store Context provider
 */

// Context
export const Store = createContext()

// Define Initial State
const initialState = {
    darkMode: Cookies.get("darkmode") === "ON" ? true : false
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

/**
 * Provider function : that returns the Store context provider
 * So, finally, we can use StoreProvider to an wrapper. Here, we pass reducer function
 * 
 *  More Details: https://dev.to/eswaraprakash/react-usecontext-and-usereducer-hooks-2pkm
 */

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}




