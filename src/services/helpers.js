export function getRndInteger(max,min=1){
    return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const operators = new Map();
operators.set(0,{operator:'*',method:(a,b)=>a*b})
operators.set(1,{operator:'/',method:(a,b)=>a/b})
operators.set(2,{operator:'+',method:(a,b)=>a+b})
operators.set(3,{operator:'-',method:(a,b)=>a-b})
