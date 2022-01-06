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
    darkMode: Cookies.get("darkmode") === "ON" ? true : false,
    cart: {
        cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
        shippingAddress: Cookies.get("shippingAddress") ? JSON.parse(Cookies.get("shippingAddress")) : {},
        paymentMethod: Cookies.get("paymentMethod") ? Cookies.get('paymentMethod') : '',
    },
    userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,
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

        case "ADD_TO_CART":
            {
                const newItem = action.payload
                const existItem = state.cart.cartItems.find((item) => item._id === newItem._id)

                const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem]

                Cookies.set('cartItems', JSON.stringify(cartItems))

                return {
                    ...state, cart: { ...state.cart, cartItems }
                }
            }
        case "REMOVE_FROM_CART": {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id)
            Cookies.set("cartItems", JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case "USER_LOGIN": {
            return { ...state, userInfo: action.data }
        }

        case "USER_LOGOUT": {
            return { ...state, userInfo: null, cart: { cartItems: null } }
        }

        case "SAVE_SHIPPING_ADDRESS":
            return { ...state, cart: { shippingAddress: action.payload } }

        case "SAVE_PAYMENT_METHOD":
            return { ...state, cart: { ...state.cart, paymentMethod: action.data } }
        default:
            return state;
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




