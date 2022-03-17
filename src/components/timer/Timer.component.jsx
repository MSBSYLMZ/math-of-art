import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useGame from '../../hooks/useGame'
import { selectGame } from '../../redux/game/game.selectors'
import { selectTimerBegin } from '../../redux/question/question.selector'

import './Timer.styles.css'

const Timer = ({question}) => {
  const gameHook = useGame();
  const timerBegin = useSelector(selectTimerBegin)
  const game = useSelector(selectGame)
  const [timerCount, setTimerCount]=useState(timerBegin)
  const [activeAnimation, setActiveAnimation]=useState({animation: `animateTimerBar ${timerBegin}s linear 0s 1`})
  const [intervalId, setIntervalId] = useState(null)

  const countDown = ()=>{ setTimerCount(time => time-1) }

  const startInterval = ()=>{
   const intId = setInterval(countDown, 1000)
   setIntervalId(intId)
  }

  const finishInterval = () => {
    clearInterval(intervalId)
    setIntervalId(null)
  }

  useEffect(() => { if(game.newGame && !intervalId) startInterval() },[game.newGame])

  useEffect(() => {
    if(timerCount<1 || game.gameover === true){
      if(game.gameover !== true) gameHook.gameOver(`Ooopss! You need to be quicker than that. Do you want to try again.`)
      finishInterval() }
  },[timerCount])

  useEffect(() => {setTimerCount(timerBegin)}, [question])

  return (
    <div className='timer-wrapper'>
      <div className='timer-count'>{timerCount}</div>
      <div className='timer' >
        { game.gameover !== true ? 
          (<div className={`timer-inner`} key={question} style={{...activeAnimation }}></div>) : null }
      </div>
    </div>
  )
}

export default Timer