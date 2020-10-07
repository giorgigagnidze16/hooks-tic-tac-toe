import React from 'react'
import './button.css'

type PTypes =  {
    onClick: (i : number) => void;
    color:string;
    value:string;
}
export const  Button = (props:PTypes) => {

    return (
        // @ts-ignore
            <button onClick={props.onClick}
                    className={'playButton'} style={{backgroundColor:props.color}} >
                &#160;
                {props.value}
            </button>
        );

}
