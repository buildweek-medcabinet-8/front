//import actions
import { 
    SET_USER,
    TOGGLE_REMEMBER_ME,
    TOGGLE_LOGIN
 } from "../actions/";

const initialState = {
    login: false,
    rememberMe: false,
    userName: '',

}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN:
            console.log("uiReducer toggle login before value", state.login)
            return {
                ...state,
                login: !state.login
            }
        case TOGGLE_REMEMBER_ME:
            return {
                ...state,
                login: !state.rememberMe
            }
        case SET_USER:
            return {
                ...state,
                userName: action.payload
            }
        default:
            return state;
    }
}

export default uiReducer;