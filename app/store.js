import { create } from "zustand";
import { createRoomStore } from "@liveblocks/zustand";
import client from "../liveblocks.config";

const generateId = () => Math.random().toString(36).substr(2, 9);

const roomStore = createRoomStore({
    client,
    presenceMapping: {
        cursor: { x: 0, y: 0 },
    },
    storageMapping: {
        items: [],
    },
});

const useStore = create((set, get) => {
    const roomStateAndActions = roomStore(set, get);

    return {
        ...roomStateAndActions,
        // State
        boards: [],
        users: [],
        isCurrentUserCreated: false,
        currentUser: "",

        // Actions
        addBoard: (boardName) =>
            set((state) => ({
                boards: [
                    ...state.boards,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        name: boardName,
                    },
                ],
            })),
        removeBoard: (boardId) =>
            set((state) => ({
                boards: state.boards.filter((board) => board.id !== boardId),
            })),
        createUser: (username) =>
            set((state) => ({
                users: [...state.users, username],
            })),
        switchIfUserCreated: () =>
            set((state) => ({
                isCurrentUserCreated: !state.isCurrentUserCreated,
            })),
        setCurrentUser: (providedUser) =>
            set((state) => ({
                currentUser: providedUser,
            })),
    };
});

export default useStore;
