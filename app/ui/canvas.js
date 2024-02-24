// import { getSvgPathFromStroke } from "../utils";
// import getStroke from "perfect-freehand";
import { Caveat } from 'next/font/google';
import styles from '../page.module.css'
import Shapes from './shapes';
import Freehand from './freehand';

export default function Canvas({id, x, y, canvasMode, onPointerDown, stroke, fill, points}) {

    if(canvasMode == 'test') {
        return (
            <div className={styles.canvas}>
                {x
                    ? `${x} × ${y}`
                    : "Move your cursor to broadcast its position to other people in the room."}
            </div>
        ); 
    } else if (canvasMode == 'shapes') {
        return (
            <Shapes id={id}/>
        )
    } 
    else if (canvasMode == 'freehand') {
        return (
            // <Freehand id={id}/>
            <Freehand x={x} y={y} onPointerDown={onPointerDown} stroke={stroke} fill={fill} points={points}/>
        )
    }
    
}

