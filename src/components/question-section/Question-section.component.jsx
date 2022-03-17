import './Question-section.styles.css'

import Timer from '../timer/Timer.component';
import Option from "../option/Option.component";
import Question from "../question/Question.component"
import DefaultButton from '../defaultButton/Default-button.component';

import { useDispatch, useSelector } from 'react-redux';
import { setNewGame } from '../../redux/game/game.actions';
import { selectSlotCount } from '../../redux/puzzle/puzzle.selector';
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { selectGame } from '../../redux/game/game.selectors'
import { setActiveAnswer, setCorrectAnswer, setCorrectAnswerCount } from '../../redux/question/question.actions';
import { selectQuestion } from '../../redux/question/question.selector';

import useGame from '../../hooks/useGame';

import { generateOptions, generateQuestion } from '../../services/question';

const QuestionSection = () => {
    const dispatch = useDispatch();
    const applyButton = useRef();
    const [question, setQuestion] = useState("");
    const [options , setOptions ] = useState([]);
    const gameHook = useGame();
    const {gameover, newGame} = useSelector(selectGame)
    const {correctAnswer, activeAnswer, correctAnswersCount} = useSelector(selectQuestion)
    const slotCount = useSelector(selectSlotCount)
    const setAnswer = (answer)=>( dispatch(setCorrectAnswer(+answer)))

    const handleApply = ()=>{
        if(activeAnswer!==''){
            if(+activeAnswer===+correctAnswer){
                dispatch(setCorrectAnswerCount(+correctAnswersCount+1))
                dispatch(setActiveAnswer(""))
                if(+correctAnswersCount+1===+slotCount) gameHook.success()
            }else{
                gameHook.gameOver()
            }
        }
    }
    const handleRestart = ()=>{ gameHook.restart() }

    const handleEnter = ()=>{ applyButton.current.click() }

    const setQuestionAndAnswer = () =>{
        const question = generateQuestion();
        setQuestion(question.question)
        setAnswer(question.answer)
    }

    useEffect(() => {
        const listener = (event)=>{
            if(event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                handleEnter()
            }
        }
        document.addEventListener('keydown',listener)
        return () => { document.removeEventListener('keypress',listener) };
    },[]);

    useEffect(() => { !gameover && setQuestionAndAnswer() }, [ correctAnswersCount ]);

    useLayoutEffect(() => {
        if(newGame){
            setQuestionAndAnswer();
            dispatch(setNewGame(false))
        }
    }, [newGame]);

    useEffect(()=>{
        if(question) {
            const options = generateOptions(correctAnswer);
            setOptions(options)
        }
    },[question])

    return (
       <div className='question-section'>
            <div className='flex-container'>
                <DefaultButton onClick={handleRestart}>RESTART</DefaultButton>
            </div>
            <Timer question={question}></Timer>
            <div className="questions">
                <Question>{question}</Question>
                { options ?
                options.map((item,index)=>(<Option key={index} value={+item} item={item}></Option>)): null }
                <DefaultButton ref={applyButton} onClick={handleApply}>Apply</DefaultButton>
            </div>
       </div>
    )
}

export default QuestionSection