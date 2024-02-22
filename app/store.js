import { create } from "zustand";
import { liveblocks } from "@liveblocks/zustand";
import { createClient } from "@liveblocks/client";

const generateId = () => Math.random().toString(36).substr(2, 9);

const client = createClient({
    publicApiKey:
        "pk_dev_QvEOtiB6QHZ0UcPR6MchZ3OC5i74Ncs-rFC8YIQfrTs-pFJ9heEiiB7dZKBXJqMG",
});

const useStore = create(
    liveblocks(
        (set) => ({
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
                    boards: state.boards.filter(
                        (board) => board.id !== boardId
                    ),
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
        }),
        { client }
    )
);

export default useStore;
