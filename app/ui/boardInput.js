"use client";
import { useEffect, useState } from "react";
import useStore from "../store";
import styles from "./boardInput.module.css";
import { useRouter } from "next/navigation";

const BoardInput = () => {
    const router = useRouter();
    const addBoard = useStore((state) => state.addBoard);
    // const users = useStore((state) => state.users);
    const createUser = useStore((state) => state.createUser);
    const isCurrentUserCreated = useStore(
        (state) => state.isCurrentUserCreated
    );
    const isBoardCreated = useStore((state) => state.isCurrentUserCreated);
    const switchIfUserCreated = useStore((state) => state.switchIfUserCreated);
    const switchIfBoardCreated = useStore((state) => state.switchIfBoardCreated);
    const [boardName, setBoardName] = useState("");

    const handleBoardSubmit = async (event) => {
        if (isBoardCreated) {
            event.preventDefault();
            const boardName = event.target.boardName.value;
            switchIfBoardCreated();
            try {
                const boardId = await createBoard(boardName);
                addBoard(boardName, boardId);
                setBoardName("");
                // router.push(`/board/${boardId}`);
            } catch (error) {
                console.error("Error creating board:", error);
            }
        }
    };

    const handleUserSubmit = (event) => {
        event.preventDefault();
        const user = event.target.username.value;
        createUser(user);
        switchIfUserCreated();
    };

    function randomId() {
        const randomId = Math.random().toString(36).substr(2, 9);
        return randomId;
    }

    async function createBoard(name) {
        const id = randomId() + "-" + name;

        const data = [
            {
                id,
                name,
                creationDate: new Date(),
            },
        ];

        const res = await fetch(`https://xboard-jz9r.onrender.com/api/createBoard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return id;
    }

    useEffect(() => {
        return () => {};
    }, [isCurrentUserCreated]);

    if (isCurrentUserCreated) {
        return (
            <form
                onSubmit={handleBoardSubmit}
                className="input-group mb-3 shadow rounded"
            >
                <input
                    type="text"
                    className={`form-control noFocusBorder ${styles.noFocusBorder}`}
                    id="boardName"
                    placeholder="Enter your nice board name"
                    value={boardName} // Controlled input
                    onChange={(e) => setBoardName(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`btn border ${styles.namebutton}`}
                >
                    Create Board
                </button>
            </form>
        );
    } else {
        return (
            <form
                onSubmit={handleUserSubmit}
                className="input-group mb-3 shadow rounded"
            >
                <input
                    type="text"
                    className={`form-control noFocusBorder ${styles.noFocusBorder}`}
                    id="username"
                    placeholder="Enter your name"
                    required
                />
                <button
                    type="submit"
                    className={`btn border ${styles.namebutton}`}
                >
                    Enter Name
                </button>
            </form>
        );
    }
};

export default BoardInput;
