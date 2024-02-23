"use client";
import Room from "./room"; // Adjust the path if necessary
import useStore from "../../store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Cursor from "../../ui/cursor";
import { useMyPresence, useOthers } from "../../../liveblocks.config";
import styles from "./page.module.css";

const COLORS = [
    "#E57373",
    "#9575CD",
    "#4FC3F7",
    "#81C784",
    "#FFF176",
    "#FF8A65",
    "#F06292",
    "#7986CB",
];

const Board = ({ roomID }) => {
    const [{ cursor }, updateMyPresence] = useMyPresence();
    const others = useOthers();

    const {
        liveblocks: { enterRoom, leaveRoom },
    } = useStore();

    useEffect(() => {
        if (roomID) {
            enterRoom(roomID);
            return () => {
                leaveRoom(roomID);
            };
        }
    }, [roomID, enterRoom, leaveRoom]);

    const handlePointerMove = (event) => {
        updateMyPresence({
            cursor: {
                x: Math.round(event.clientX),
                y: Math.round(event.clientY),
            },
        });
    };

    if (!roomID) {
        return <div>Loading...</div>;
    }

    return (
        <main
            className={styles.container}
            onPointerMove={handlePointerMove}
            onPointerLeave={() =>
                // When the pointer goes out, set cursor to null
                updateMyPresence({
                    cursor: null,
                })
            }
        >
            <div className={styles.text}>
                {cursor
                    ? `${cursor.x} × ${cursor.y}`
                    : "Move your cursor to broadcast its position to other people in the room."}
            </div>

            {
                // Iterate over other users and display a cursor based on their presence
                others.map(({ connectionId, presence }) => {
                    // Ensure presence.cursor is not null before rendering Cursor component
                    if (!presence.cursor) {
                        return null;
                    }

                    return (
                        <Cursor
                            key={`cursor-${connectionId}`}
                            color={COLORS[connectionId % COLORS.length]}
                            x={presence.cursor.x}
                            y={presence.cursor.y}
                        />
                    );
                })
            }
        </main>
    );
};

export default function RoomInstance() {
    const params = useParams();
    const roomID = params.boardID;

    return (
        <Room roomID={roomID} initialPresence={{ cursor: { x: 0, y: 0 } }}>
            <Board roomID={roomID} />
        </Room>
    );
}
