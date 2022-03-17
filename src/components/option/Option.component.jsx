import './Option.styles.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectGame } from '../../redux/game/game.selectors'
import { selectQuestion } from '../../redux/question/question.selector'
import { setActiveAnswer } from '../../redux/question/question.actions'

const Option = ({item,value}) => {
    const dispatch = useDispatch()
    const { activeAnswer, correctAnswer } = useSelector(selectQuestion)
    const game = useSelector(selectGame);

    const handleClick = ()=>{
        if(!game.gameover)
        dispatch(setActiveAnswer(value))
    }
  return (
    <div className={`${activeAnswer===value ? "active" : ''} ${activeAnswer===value && !game.success  && game.gameover ? "wrong" : ''} ${+correctAnswer===value && !game.success  && game.gameover ? "right" : ''} option`}  value={value} onClick={handleClick} >{item}</div>
  )
}

export default Option