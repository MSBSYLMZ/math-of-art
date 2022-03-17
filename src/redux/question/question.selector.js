export const selectQuestion = (state=>state.question);

export const selectActiveAnswer = (state=>state.question.activeAnswer)

export const selectCorrectAnswer = ( state => state.question.correctAnswer)

export const selectCorrectAnswersCount = (state => state.question.correctAnswersCount)

export const selectTimerBegin = (state => state.question.timerBegin)
