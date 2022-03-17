import QuestionActionTypes from './question.types'

export const setActiveAnswer = (activeAnswer)=>({
    type:QuestionActionTypes.SET_ACTIVE_ANSWER,
    payload: activeAnswer
})

export const setCorrectAnswer = (answer) =>({
    type:QuestionActionTypes.SET_CORRECT_ANSWER,
    payload:answer
})

export const setCorrectAnswerCount = (count = 1)=>({
    type: QuestionActionTypes.SET_CORRECT_ANSWER_COUNT,
    payload: count
})
