import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Room({ roomId, children }) {
    // if (!roomId) {
    //     throw new Error("RoomProvider id property is required.");
    // }

    return (
        <RoomProvider id={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
