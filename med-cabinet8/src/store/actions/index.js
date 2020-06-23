export const SET_USER = "SET_USER";
export const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";
export const TOGGLE_LOGIN = "TOGGLE_LOGIN";

export const toggleLogin = () => {

    return {
        type: TOGGLE_LOGIN,
    };
};

export const toggleRememberMe = () => {
    return {
        type: TOGGLE_REMEMBER_ME,
    };
};

export const setUser = () => {
    return {
        type: SET_USER,
    }
}