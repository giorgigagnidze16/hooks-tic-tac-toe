
interface DimensionTypes  {
    width:number;
    height:number;
    winningStreak:number;
}
interface calculateWinner {
    width:number;
    height:number;
    winningStreak:number;
    boardState:any[]
}
export function getWinningLines({ width, height, winningStreak } : DimensionTypes) {

    const horizontalLines = get2DMatrixWithIndexes({ width, height });
    const verticalLines = getTranspose(horizontalLines);
    const leftDiagonalLines = diagonal(horizontalLines,'topToBottom');
    const rightDiagonalLines = diagonal(horizontalLines,'bottomToTop');

    const potentialWinningLines = [
        ...horizontalLines,
        ...verticalLines,
        ...leftDiagonalLines,
        ...rightDiagonalLines
    ].filter(
        value => {return value.length >= winningStreak}
    );




    let winningLines = [];
    for (const line of potentialWinningLines) {
        for (let j=0; j<line.length; j++) {
            if((j+winningStreak) <= line.length){
                winningLines.push(line.slice(j,j+winningStreak));

            }
        }
    }

    return winningLines;
}


function diagonal(horizontalLines : number[][], bottomOrTop : string) {
    var height = horizontalLines.length;
    var width = horizontalLines[0].length;
    var maxLength = Math.max(width, height);
    var temp;
    var finalArray = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = height - 1; y >= 0; --y) {
            var x = k - (bottomOrTop==='bottomToTop' ? height - y : y);
            if (x >= 0 && x < width) {
                temp.push(horizontalLines[y][x]);
            }
        }
        if(temp.length > 0) {
            finalArray.push(temp);
        }
    }
    return finalArray;
}

function getTranspose(arrays : any[]) {
    return arrays[0].map((_:any,i : number) => {
        return arrays.map((array) => array[i])
    });
}

const get2DMatrixWithIndexes = ({ width, height } : {width:number,height:number}) => {
    const horizontalLines = [];
    const myArr = new Array(width * height).fill(null).map((e, i) => i);

    for(let i=0; i < myArr.length;  i+=width){
        if(i % width === 0){
            horizontalLines.push(myArr.slice(i,(i+width)));
        }
    }
    return horizontalLines;
}

export function calculateWinner({ width, height, winningStreak, boardState } : calculateWinner) {
    const winningLines = getWinningLines({
        width,
        height,
        winningStreak
    });
    let lines = [];
    for (let i = 0; i < winningLines.length; i++) {
        const [firstCellIndex, ...rest] = winningLines[i];

        if (
            boardState[firstCellIndex]
            && rest.every((cellIndex:number) => boardState[firstCellIndex] === boardState[cellIndex])
        ) {
            lines=[firstCellIndex,...rest];
            return {winner:boardState[firstCellIndex] , winningLines:lines};
        }
    }
    return null;
}