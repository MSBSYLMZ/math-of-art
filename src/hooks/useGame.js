import { useDispatch, batch, useSelector } from "react-redux";
import { setAddedPiecesCount, setImageLink, setCtx } from "../redux/puzzle/puzzle.actions";
import { useCallback } from 'react'
import { setActiveAnswer, setCorrectAnswer, setCorrectAnswerCount } from "../redux/question/question.actions";
import { setGameOver, setNewGame, setSuccess, setMessage } from "../redux/game/game.actions";
import { setShowMessage, setMessageType } from "../redux/game/game.actions";
import { selectCurrentUser } from "../redux/user/user.selector";
import { selectCanvas, selectCtx } from "../redux/puzzle/puzzle.selector";
import { clearCanvas } from "../services/canvas";


function useGame(){
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const canvas = useSelector(selectCanvas);
    const ctx = useSelector(selectCtx);
    const DEFAULT_SUCCESS_MESSAGE = ` Yeyyy! ${currentUser?.name ? currentUser.name : ''} you have done the mission successfully`
    const DEFAULT_GAMEOVER_MESSAGE = ` Ooopss! ${currentUser?.name ? currentUser.name : ''} you have done a little mistake.  Do you want to try again? `;
    const start = useCallback(async ()=>{
    const response = await fetch('https://picsum.photos/600');
    const newImageLink = response.url;
        batch(() => {
            dispatch(setImageLink(newImageLink))
        })
    },[])

    const restart = useCallback(async ()=>{
    const cleanCtx = clearCanvas(ctx)
    const response = await fetch('https://picsum.photos/600');
    const newImageLink = response.url;
        batch(() => {
            dispatch(setImageLink(newImageLink))
            dispatch(setCorrectAnswer(null))
            dispatch(setShowMessage(false))
            dispatch(setCorrectAnswerCount(0))
            dispatch(setAddedPiecesCount(0))
            dispatch(setActiveAnswer(null))
            dispatch(setGameOver(false))
            dispatch(setSuccess(false))
            dispatch(setNewGame(true))
            dispatch(setCtx(cleanCtx))
        })
    },[canvas])

    const gameOver = useCallback((message= DEFAULT_GAMEOVER_MESSAGE)=>{
        batch(()=>{
            dispatch(setGameOver(true));
            dispatch(setSuccess(false));
            dispatch(setShowMessage(true))
            dispatch(setMessage(message))
            dispatch(setMessageType('fail'))
        })
    })
    const success = useCallback((message = DEFAULT_SUCCESS_MESSAGE)=>{
        batch(()=>{
            dispatch(setGameOver(true));
            dispatch(setSuccess(true));
            dispatch(setShowMessage(true))
            dispatch(setMessage(message))
            dispatch(setMessageType('success'))
        })
    })

    
    return {
        start,
        restart,
        gameOver,
        success
    }
}

export default useGame;