import { RoomProvider } from "../../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Room({ id, initialPresence, initialStorage, children }) {
    return (
        <RoomProvider id={id} initialPresence={{initialPresence}} initialStorage={{initialStorage}}>
            <ClientSideSuspense fallback={<div>Loading… Client suspense component</div>}>
            {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
