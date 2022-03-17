import { combineReducers } from "redux";

import userReducer from './user/user.reducer'
import questionReducer from './question/question.reducer'
import puzzleReducer from './puzzle/puzzle.reducer'
import gameReducer from './game/game.reducer'

const rootReducer = combineReducers({
    puzzle : puzzleReducer,
    game : gameReducer,
    user:userReducer,
    question:questionReducer
})

export default rootReducer;