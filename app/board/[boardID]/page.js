"use client";
import Room from "../../room"; // Adjust the path if necessary
import useStore from "../../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Board = () => {
    const router = useRouter();
    const roomId = router.query?.boardID;

    const {
        liveblocks: { enterRoom, leaveRoom },
    } = useStore();

    useEffect(() => {
        // Check if the router is ready and roomId is available
        if (router.isReady && roomId) {
            enterRoom(roomId);
            return () => {
                leaveRoom(roomId);
            };
        }
    }, [router.isReady, roomId, enterRoom, leaveRoom]);

    if (!router.isReady) {

        return <div>Loading...</div>;
    }

    return (
        <Room roomId={roomId}>
            <div>This is board {roomId}</div>
        </Room>
    );
};

export default Board;