import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
// import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
// import { Point, Color, Layer } from "./src/types";

const client = createClient({
    // throttle: 16,
    // authEndpoint: "/api/liveblocks-auth",
    publicApiKey: "pk_dev_QvEOtiB6QHZ0UcPR6MchZ3OC5i74Ncs-rFC8YIQfrTs-pFJ9heEiiB7dZKBXJqMG",
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
// type Presence = {
//     selection: string[];
//     cursor: Point | null;
//     pencilDraft: [x: number, y: number, pressure: number][] | null;
//     penColor: Color | null;
// };

// type Presence = {
//     cursor: { x: number; y: number } | null;
//   };

// Storage represents the shared document that persists in the Room, even after
// all Users leave. Fields under Storage typically are LiveList, LiveMap,
// LiveObject instances, for which updates are automatically persisted and
// synced to all connected clients.
// type Storage = {
//     layers: LiveMap<string, LiveObject<Layer>>;
//     layerIds: LiveList<string>;
// };

// type Storage = {
//     id: string[]
// };

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
// type UserMeta = {
//   id?: string,  // Accessible through `user.id`
//   info?: Json,  // Accessible through `user.info`
// };

// Optionally, the type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
// type RoomEvent = {};

export const {
    suspense: {
        RoomProvider,
        useCanRedo,
        useCanUndo,
        useHistory,
        useMutation,
        useOthers,
        useOthersMapped,
        useOthersConnectionIds,
        useOther,
        useRoom,
        useSelf,
        useStorage,
        useUpdateMyPresence,
        useMyPresence
    },
    // } = createRoomContext<Presence, Storage /* UserMeta, RoomEvent */>(client);
} = createRoomContext(client);

