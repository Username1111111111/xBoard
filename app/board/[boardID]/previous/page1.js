"use client";
import Room from "./room"; // Adjust the path if necessary
import useStore from "../../store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Cursor from "../../ui/cursor";
import { useMyPresence, useOthers, useStorage } from "../../../liveblocks.config";
import styles from "./page.module.css";
import Canvas from "../../ui/canvas";

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

const Board = (id) => {
    const [{ cursor }, updateMyPresence] = useMyPresence();
    // const [storage, updateMyStorage ] = useStorage();
    // const id = useStorage((root) => root.id);
    const others = useOthers();

    // const id = storage.id;
    const initialCursorPosition = { x: 0, y: 0 };

    const {
        liveblocks: { enterRoom, leaveRoom },
    } = useStore();

    useEffect(() => {
        if (id) {
            enterRoom(id);
            return () => {
                leaveRoom(id);
            };
        }
    }, [id, enterRoom, leaveRoom]);

    
    useEffect(() => {
        updateMyPresence(initialCursorPosition);
    }, [updateMyPresence]);

    const handlePointerMove = (event) => {
        updateMyPresence({
            cursor: {
                x: Math.round(event.clientX),
                y: Math.round(event.clientY),
            },
        });
    };

    if (!id) {
        return <div>Loading...</div>;
    }

    // const canvasModes = ['test', 'shapes', 'freehand'];

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
            <Canvas className={styles.canvas} id={id} x={cursor?.x} y={cursor?.y} canvasMode={"test"} />
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
        <Room
            id={roomID}
            initialPresence={{ id: roomID, cursor: { x: 0, y: 0 } }}
            initialStorage={{id: roomID}}
        >
            <Board id={roomID}/>
        </Room>
    );
}
