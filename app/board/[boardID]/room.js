import { RoomProvider } from "../../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Room({ roomID, initialPresence, children }) {
    return (
        <RoomProvider id={roomID} initialPresence={{initialPresence}}>
            <ClientSideSuspense fallback={<div>Loading… Client suspense</div>}>
            {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
