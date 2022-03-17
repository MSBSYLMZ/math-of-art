import './Message.styles.css'

import useGame from '../../hooks/useGame'

import { useDispatch, useSelector } from 'react-redux'
import { selectGame } from '../../redux/game/game.selectors'
import { setShowMessage } from '../../redux/game/game.actions'

import DefaultButton from '../defaultButton/Default-button.component'

const Message = () => {
  const dispatch = useDispatch()
  const {gameover, success, message ,messageType} = useSelector(selectGame)
  const gameHook = useGame();

  const restartGame = ()=>{ gameHook.restart() }
  const closeMessage = ()=>{ dispatch(setShowMessage(false)) }

  return (
    <div className={`${messageType ? `${messageType}` : 'info' } message-wrapper`}>
      <div className='message-container'>
        <div className='message'>{message}</div>
            { gameover ? (!success ? (
            <>
              <DefaultButton className='message-button' onClick={restartGame}>Restart</DefaultButton>
              <DefaultButton className='message-button' onClick={closeMessage}>Nope!</DefaultButton>
            </> ):
              <DefaultButton className='message-button' onClick={closeMessage}>Yeyy!</DefaultButton>) :
              (<DefaultButton className='message-button' onClick={closeMessage}>OKAY</DefaultButton>)}
      </div>
    </div>
  )
}
export default Message
