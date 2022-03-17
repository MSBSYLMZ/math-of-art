import PuzzleActionTypes from "./puzzle.types";


const INITIAL_STATE = {
    addedPiecesCount : 0,
    imageLink: '',
    canvas:{
        height:0,
        width:0
    },
    ctx:null,
    slotCount: 16
}

const puzzleReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case PuzzleActionTypes.SET_ADDED_PIECES_COUNT:
            return {
                ...state,
                addedPiecesCount : action.payload
            }
        case PuzzleActionTypes.SET_IMAGE_LINK:
            return {
                ...state,
                imageLink: action.payload
            }
        case PuzzleActionTypes.SET_SLOT_COUNT:
            return {
                ...state,
                slotCount:action.payload
            }
        case PuzzleActionTypes.SET_CANVAS:
            return {
                ...state,
                canvas:action.payload
            }
        case PuzzleActionTypes.SET_CTX:
            if(typeof action.payload === 'function'){
                return {
                    ...state,
                    ctx: action.payload(state.ctx)
                }
            }
            return {
                ...state,
                ctx:action.payload
            }
        default:
            return state;
    }
}

export default puzzleReducer;