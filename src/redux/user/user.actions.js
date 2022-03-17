import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
    type:UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const checkCurrentUser = ()=>({
    type:UserActionTypes.CHECK_CURRENT_USER
})