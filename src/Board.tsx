import React from 'react'
import {Button} from "./Button";

type PTypes = {
    squares: (string | null)[];
    width:number;
    height:number;
    onClick:any;
    userLines:number[];
}

export const Board = (props:PTypes) => {
    let cellsCount : number = props.width * props.height;
    let linesthatWon : number[] = props.userLines;
    return (
        <div>
            {new Array(cellsCount).fill(null).map((e, i) => {
                let color : string ='';

                if (linesthatWon.includes(i)){
                    color='green'
                }
                return(
                    <React.Fragment key={i}>
                        <Button
                            value={props.squares[i]!}
                            onClick={() => props.onClick(i)}
                            color={color}
                        />
                        {(i+1) % props.width === 0 && <br />}
                    </React.Fragment>
                )
            })}
        </div>
    );
}