// import { getSvgPathFromStroke } from "../utils";
// import getStroke from "perfect-freehand";
import styles from '../page.module.css'
import Shapes from './shapes';

export default function Canvas({id, x, y, canvasMode}) {

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
    
}
