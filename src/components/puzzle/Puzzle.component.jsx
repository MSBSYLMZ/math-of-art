import './Puzzle.styles.css'

import { useLayoutEffect, useCallback, useRef, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectCorrectAnswersCount } from '../../redux/question/question.selector';
import { setAddedPiecesCount, setCtx as ctxSetter, setCanvas } from '../../redux/puzzle/puzzle.actions';
import { selectAddedPiecesCount, selectCtx, selectImageLink, selectSlotCount } from '../../redux/puzzle/puzzle.selector';

import useGame from '../../hooks/useGame';
import { setStrokes } from '../../services/canvas';

const Puzzle = () => {
    const dispatch = useDispatch();
    const gameHook = useGame();
    const puzzleCanvas=useRef();
    const ctx = useSelector(selectCtx);
    const slotCount = useSelector(selectSlotCount);
    const imageLink = useSelector(selectImageLink);
    const addedPiecesCount = useSelector(selectAddedPiecesCount);
    const corretAnswersCount = useSelector(selectCorrectAnswersCount)
    const setCtx = (ctx)=>{dispatch(ctxSetter(ctx))}
    const setAddedPieces=(addedPieceCount) => {dispatch(setAddedPiecesCount(addedPieceCount))}
    const [imagePiecesArray, setImagePieces] = useState([]);

    const getSquareInfo = useCallback(()=>{
        const DEFAULT_BORDER_SIZE = 1;
        const DEFAULT_CANVAS_WİDTH = 600;
        const slotSquareRoot = Math.sqrt(slotCount);
        const canvasWidth = ctx?.canvas.width ?? DEFAULT_CANVAS_WİDTH;
        const singleSquareSize = canvasWidth / slotSquareRoot;
        const singleSquareWithoutBorder = singleSquareSize - 2 * DEFAULT_BORDER_SIZE;
        return {
            slotSquareRoot,
            singleSquareSize,
            singleSquareWithoutBorder
        }
    },[slotCount])

    const {
        slotSquareRoot,
        singleSquareSize,
        singleSquareWithoutBorder
    } = getSquareInfo();


    const getImage = useCallback(()=>{
        let img=new Image();
        const imagePieces = [];
        img.src=imageLink;
        img.onload=function(){
            for (let i = 0; i < slotSquareRoot; i++) {
                let yAxis=i*singleSquareSize+1;
                for (let j = 0; j < slotSquareRoot; j++) {
                    let xAxis=j*singleSquareSize+1;
                    let temporaryCanvas=document.createElement('canvas');
                    let temporaryCtx=temporaryCanvas.getContext('2d');
                    temporaryCtx.drawImage(img, xAxis, yAxis, singleSquareWithoutBorder,singleSquareWithoutBorder,0,0,singleSquareWithoutBorder,singleSquareWithoutBorder);
                    imagePieces.push(temporaryCanvas);
                }
            }
            setImagePieces(imagePieces);
        }
    },[imageLink])

    const handleAdding = ()=>{
        let count = 0;
        const diff = corretAnswersCount - addedPiecesCount;
        if(diff>0){
            for(let i=0; i<diff; i++){
                addPiece();
                count++;
            }
        }
        setAddedPieces(addedPiecesCount+count)
    }

    const addPiece= ()=>{
        let count = 0;
        const newCtx = puzzleCanvas.current.getContext('2d');
            let xAxis=addedPiecesCount !== 0 && addedPiecesCount % slotSquareRoot === 0 ? 0 : (addedPiecesCount%slotSquareRoot) * singleSquareSize; 
            let yAxis=addedPiecesCount !== 0 && addedPiecesCount % slotSquareRoot !== 0 ? Math.floor(addedPiecesCount/slotSquareRoot) * singleSquareSize : (addedPiecesCount/slotSquareRoot) * singleSquareSize; 
            newCtx.drawImage(imagePiecesArray[addedPiecesCount], 0,0, singleSquareWithoutBorder,singleSquareWithoutBorder,xAxis,yAxis,singleSquareWithoutBorder,singleSquareWithoutBorder)
            setCtx(newCtx)
            count++;
        return count;
    }

    useLayoutEffect(()=>{
        getImage();
        setCtx(puzzleCanvas.current.getContext('2d'))
        imageLink && setCtx(setStrokes) 
    },[imageLink])

    useEffect(() => {
        handleAdding();
    }, [corretAnswersCount]);

    useEffect(() => {
        gameHook.start()
        dispatch(setCanvas(puzzleCanvas))
    }, []);

    return (
        <div className='puzzle'>
            <canvas height={600} width={600} ref={puzzleCanvas} id='puzzle-canvas'/>
        </div>
    )
}

export default Puzzle
