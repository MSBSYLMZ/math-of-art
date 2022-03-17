import PuzzleActionTypes from "./puzzle.types"

export const setAddedPiecesCount = (addedPieces)=>({
    type:PuzzleActionTypes.SET_ADDED_PIECES_COUNT,
    payload: addedPieces
});

export const setImageLink = (imageLink)=>({
    type: PuzzleActionTypes.SET_IMAGE_LINK,
    payload: imageLink
})

export const setCanvas=(canvas)=>({
    type:PuzzleActionTypes.SET_CANVAS,
    payload:{
        height:canvas.current.height,
        width:canvas.current.width
    }
})

export const setCtx = (ctx) => ({
    type:PuzzleActionTypes.SET_CTX,
    payload:ctx
})

export const setSlotCount = (slotCount) =>({
    type: PuzzleActionTypes.SET_SLOT_COUNT,
    payload:slotCount
})
