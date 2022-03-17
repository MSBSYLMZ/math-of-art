import QuestionActionTypes from './question.types'


const INITIAL_STATE = {
    activeAnswer:null,
    correctAnswer:null,
    correctAnswersCount:0,
    timerBegin:8,
    error:null
}

const questionReducer = (state= INITIAL_STATE,action)=>{
    switch (action.type) {
        case QuestionActionTypes.SET_ACTIVE_ANSWER:
            return {
                ...state,
                activeAnswer:action.payload
            }
        case QuestionActionTypes.SET_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswer:action.payload
            } 
        case QuestionActionTypes.SET_CORRECT_ANSWER_COUNT:
            return {
                ...state,
                correctAnswersCount:action.payload
            }
        default:
            return state;
            
    }
}

export default questionReducer