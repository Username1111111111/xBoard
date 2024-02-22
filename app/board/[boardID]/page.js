"use client";
import Room from "../../room"; // Adjust the path if necessary

const Board = ({ roomId }) => {
    // Make sure roomId is not undefined or null
    if (!roomId) {
        return <div>Board ID is not provided</div>;
    }

    return (
        <Room roomId={roomId}>
            <div>This is board {roomId}</div>
        </Room>
    );
};

export default Board;
