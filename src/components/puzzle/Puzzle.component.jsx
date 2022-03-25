import './Puzzle.styles.css'

import { useLayoutEffect, useCallback, useRef, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectCorrectAnswersCount } from '../../redux/question/question.selector';
import { setAddedPiecesCount, setCtx as ctxSetter } from '../../redux/puzzle/puzzle.actions';
import { selectAddedPiecesCount, selectCtx, selectImageLink, selectSlotCount } from '../../redux/puzzle/puzzle.selector';

import { getRndInteger, removeElementFromArray, createSlotsInfoObject } from '../../services/helpers';
import { clearCanvas, setStrokes, calculateCanvasSize } from '../../services/canvas.js'

import useGame from '../../hooks/useGame';

const Puzzle = () => {
    const DEFAULT_CANVAS_SIZE = calculateCanvasSize(window.innerWidth);
    const DEFAULT_IMAGE_PIECE_SIZE =148

    const dispatch = useDispatch();
    const gameHook = useGame();
    const puzzleCanvas=useRef();
    const ctx = useSelector(selectCtx);
    const slotCount = useSelector(selectSlotCount);
    const imageLink = useSelector(selectImageLink);
    // TODO: check if added pieces count neccessary 
    const addedPiecesCount = useSelector(selectAddedPiecesCount);
    const corretAnswersCount = useSelector(selectCorrectAnswersCount)
    const setCtx = (ctx)=>{dispatch(ctxSetter(ctx))}
    const setAddedPieces=(addedPieceCount) => {dispatch(setAddedPiecesCount(addedPieceCount))}
    const [imagePiecesArray, setImagePieces] = useState([]);

    // This object represents each slot on the puzzle 
    const [ slotsInfo, setSlotsInfo] = useState({})
    const [ emptySlotsArray , setEmptySlotsArray ] = useState([]);
    const [ canvasSize, setCanvasSize ] = useState();

    const getSquareInfo = useCallback(()=>{
        const DEFAULT_BORDER_SIZE = 1;
        const slotSquareRoot = Math.sqrt(slotCount);
        const widthOfCanvas = canvasSize ?? DEFAULT_CANVAS_SIZE;
        const singleSquareSize = widthOfCanvas / slotSquareRoot;
        const singleSquareWithoutBorder = singleSquareSize - 2 * DEFAULT_BORDER_SIZE;
        return {
            slotSquareRoot,
            singleSquareSize,
            singleSquareWithoutBorder
        }
    },[slotCount, canvasSize])

    const {
        slotSquareRoot,
        singleSquareSize,
        singleSquareWithoutBorder,
    } = getSquareInfo();

    const getImage = useCallback(()=>{
        let img=new Image();
        img.src=imageLink;
        img.onload=function(){
            const imagePieces = splitImage(img);
            setImagePieces(imagePieces);
        }
    },[imageLink])

    const splitImage = useCallback((img) => {
        const imagePieces = [];
        for (let i = 0; i < slotSquareRoot; i++) {
                let yAxis = i * DEFAULT_IMAGE_PIECE_SIZE + 1;

                for (let j = 0; j < slotSquareRoot; j++) {
                    let xAxis = j * DEFAULT_IMAGE_PIECE_SIZE + 1;
                    let temporaryCanvas = document.createElement('canvas');
                    let temporaryCtx = temporaryCanvas.getContext('2d');

                    temporaryCtx.canvas.width = DEFAULT_IMAGE_PIECE_SIZE;
                    temporaryCtx.canvas.height = DEFAULT_IMAGE_PIECE_SIZE;
                    temporaryCtx.drawImage(
                                            img,
                                            xAxis, yAxis,
                                            DEFAULT_IMAGE_PIECE_SIZE,DEFAULT_IMAGE_PIECE_SIZE,
                                            0,0,
                                            DEFAULT_IMAGE_PIECE_SIZE,DEFAULT_IMAGE_PIECE_SIZE
                                            );
                    imagePieces.push(temporaryCanvas);
                }
            }
            return imagePieces;
    }, [])

    const handleAdding = ()=>{
        if(!ctx) return;
        const randIndex = emptySlotsArray.length < 2 ? 0 : getRndInteger(emptySlotsArray.length);
        const pieceNumber = emptySlotsArray[randIndex];
        const newCtx  = addPiece(pieceNumber);
        const newSlotsInfo = { ...slotsInfo };
        newSlotsInfo[pieceNumber] =  true;
        const newEmptySlotsArray = removeElementFromArray( emptySlotsArray, randIndex );
        setCtx(newCtx);
        setSlotsInfo(newSlotsInfo);
        setEmptySlotsArray(newEmptySlotsArray);
        setAddedPieces(addedPiecesCount + 1);
    }

    const addPiece= useCallback((pieceNumber)=>{
        const axisInfo = calculatePieceAxis(pieceNumber);
        ctx.drawImage(
            imagePiecesArray[pieceNumber], 
            0,0, 
            DEFAULT_IMAGE_PIECE_SIZE,DEFAULT_IMAGE_PIECE_SIZE,
            axisInfo.xAxis,axisInfo.yAxis,
            singleSquareWithoutBorder,singleSquareWithoutBorder
        );
        return ctx
    },[ctx, imagePiecesArray, singleSquareWithoutBorder])



    const calculatePieceAxis = useCallback((pieceNumber) => {
        let xAxis=pieceNumber !== 0 && pieceNumber % slotSquareRoot === 0 ?
                        0 : ( pieceNumber % slotSquareRoot ) * singleSquareSize; 
        let yAxis=pieceNumber !== 0 && pieceNumber % slotSquareRoot !== 0 ? 
                        Math.floor( pieceNumber / slotSquareRoot ) * singleSquareSize : ( pieceNumber / slotSquareRoot ) * singleSquareSize; 
        xAxis++;
        yAxis++;
        return {
            xAxis,
            yAxis
        }
    }, [ singleSquareSize , slotSquareRoot ]);

    const resetSlotsInfo = useCallback(() => {
        const newSlotsInfo = createSlotsInfoObject(slotCount);
        setSlotsInfo(newSlotsInfo);
        setEmptySlotsArray(Object.keys(newSlotsInfo));
    }, [slotCount]);

    const handleResize = useCallback(() =>{
        const windowWidth = window.innerWidth;
        const newCanvasSize = calculateCanvasSize(windowWidth);
        if(ctx && newCanvasSize !== ctx.canvas.width){
            resizeCanvas(newCanvasSize);
            setCtx(ctx);
            setCanvasSize(newCanvasSize);
        }
    }, [window.innerWidth, ctx])

    const restoreAddedPieces = useCallback(()=>{
        if ( emptySlotsArray.length < slotCount ){
            for (let index in slotsInfo){
                if (slotsInfo[index] === true) addPiece(index)
            }
        }
    },[emptySlotsArray, slotCount, slotsInfo, addPiece])
    
    const resizeCanvas = useCallback((size)=>{
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        return ctx;
    },[ctx])
    
    useLayoutEffect(()=>{
        getImage();
        let newCtx = ctx;
        if (!ctx)  newCtx = puzzleCanvas.current.getContext('2d')
        imageLink && setCtx(setStrokes(newCtx,slotSquareRoot));
        resetSlotsInfo();
    },[imageLink])

    useEffect(() => {
        if (corretAnswersCount > addedPiecesCount) handleAdding();
    }, [corretAnswersCount]);

    useEffect(() => { gameHook.start() }, []);

    useEffect(() => {
        if(ctx){
            clearCanvas(ctx);
            setStrokes(ctx,slotSquareRoot);
            restoreAddedPieces();
            setCtx(ctx);
        }
    },[canvasSize])

    useEffect(() => {
        let timeout;
        function onResizeEnd() {
            clearTimeout(timeout)
            timeout = setTimeout(handleResize,100);
        }
        window.addEventListener('resize', onResizeEnd);
        return () => window.removeEventListener('resize', onResizeEnd);
    }, [ ctx, emptySlotsArray.length ]);


    return (
        <div className='puzzle'>
            <canvas height={DEFAULT_CANVAS_SIZE} width={DEFAULT_CANVAS_SIZE} ref={puzzleCanvas} id='puzzle-canvas'/>
        </div>
    )
}

export default Puzzle
