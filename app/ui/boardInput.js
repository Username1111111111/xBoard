"use client";
import { useEffect } from "react";
import useStore from "../store";

const BoardInput = () => {
    const addBoard = useStore((state) => state.addBoard);
    // const users = useStore((state) => state.users);
    const createUser = useStore((state) => state.createUser);
    const isCurrentUserCreated = useStore(
        (state) => state.isCurrentUserCreated
    );
    const switchIfUserCreated = useStore((state) => state.switchIfUserCreated);

    const handleBoardSubmit = (event) => {
        event.preventDefault();
        const boardName = event.target.boardName.value;
        const boardId = createBoard(boardName);
        addBoard(boardName, boardId);
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

        const id = randomId() + "-" +  name;

        const data = [
            {
                id,
                name,
                creationDate: new Date(),
            },
        ];

        const res = await fetch(`http://localhost:3000/api/createBoard`, {
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
            <form onSubmit={handleBoardSubmit} className="input-group mb-3 shadow rounded">
                <input
                    type="text"
                    className="form-control"
                    id="boardName"
                    placeholder="Enter your nice board name"
                    required
                />
                <button type="submit" className="btn btn-secondary">
                    Create Board
                </button>
            </form>
        );
    } else {
        return (
            <form onSubmit={handleUserSubmit} className="input-group mb-3 shadow rounded">
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your name"
                    required
                />
                <button type="submit" className="btn btn-secondary">
                    Enter Name
                </button>
            </form>
        );
    }
};

export default BoardInput;
