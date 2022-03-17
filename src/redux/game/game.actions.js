import GameActionTypes from "./game.types"

export const setGameOver = (gameover)=>({
    type:GameActionTypes.SET_GAME_OVER,
    payload: gameover
});

export const setSuccess = (success) =>({
    type: GameActionTypes.SET_SUCCESS,
    payload:success
})

export const setMessage = (message) =>({
    type: GameActionTypes.SET_MESSAGE,
    payload: message
})

export const setMessageType = (type) =>({
    type: GameActionTypes.SET_MESSAGE_TYPE,
    payload: type
})

export const setShowMessage = (show)=>({
    type:GameActionTypes.SET_SHOW_MESSAGE,
    payload:show
})

export const setNewGame = (isNew) => ({
    type:GameActionTypes.SET_NEW_GAME,
    payload:isNew
})