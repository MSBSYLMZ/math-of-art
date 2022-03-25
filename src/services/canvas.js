// 4*4
const DEFAULT_SQUARE_COUNT = 4

export function setStrokes (ctx, squareCount = DEFAULT_SQUARE_COUNT){
    const canvasWidth = ctx.canvas.width;
    const singleSquareSize = canvasWidth / squareCount
    if(ctx){
        for (let i = 0; i < squareCount; i++) {
            let xAxis=i * singleSquareSize;
            for (let j = 0; j < squareCount; j++) {
                let yAxis=j * singleSquareSize;
                ctx.strokeStyle = '#FFFA4D';
                ctx.strokeRect(xAxis, yAxis, singleSquareSize, singleSquareSize);
            }
        }
    }
    return ctx;
}

export function clearCanvas (ctx){
        return ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function calculateCanvasSize(windowWidth){
    if(windowWidth > 1200) return 600;
    if(windowWidth < 600 && windowWidth >=320) return 300;
    if(windowWidth < 320 && windowWidth >=250) return 250;
    if(windowWidth < 250) return 200;
    return Math.floor(windowWidth / 200) * 200 /2 ;
}