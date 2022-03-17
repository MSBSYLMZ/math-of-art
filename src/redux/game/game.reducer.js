import GameActionTypes from "./game.types";

const INITIAL_STATE = {
    newGame:true,
    success: false,
    gameover:false,
    message:'',
    messageType:'info',
    showMessage:false
}

const gameReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case GameActionTypes.SET_SUCCESS:
            return {
                ...state,
                success:action.payload
            }
        case GameActionTypes.SET_GAME_OVER:
            return {
                ...state,
                gameover:action.payload
            }
        case GameActionTypes.SET_MESSAGE:
            return {
                ...state,
                message:action.payload
            }    
        case GameActionTypes.SET_MESSAGE_TYPE:
            return {
                ...state,
                messageType:action.payload
            }  
        case GameActionTypes.SET_SHOW_MESSAGE:
            return {
                ...state,
                showMessage:action.payload
            }
        case GameActionTypes.SET_NEW_GAME:
            return {
                ...state,
                newGame:action.payload
            }
        default:
            return state
    }
}

export default gameReducer