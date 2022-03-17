// 4*4
const DEFAULT_SQUARE_COUNT = 4

export const setStrokes=(ctx, squareCount = DEFAULT_SQUARE_COUNT)=>{
    const canvasWidth = ctx.canvas.width;
    const singleSquareSize = canvasWidth / squareCount
    if(ctx){
        for (let i = 0; i < squareCount; i++) {
            let xAxis=i * singleSquareSize;
            for (let j = 0; j < squareCount; j++) {
                let yAxis=j * singleSquareSize;
                ctx.strokeStyle = '#f7f7f7';
                ctx.strokeRect(xAxis, yAxis, singleSquareSize, singleSquareSize);
            }
        }
    }
    return ctx;
}

export const clearCanvas = (ctx)=>{
        return ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}