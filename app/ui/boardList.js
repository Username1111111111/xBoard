"use client";
import useStore from "../store"; // Make sure to use curly braces for named export
import { useRouter } from "next/navigation";
import BoardCard from "../ui/boardCard";
import { useEffect } from "react";

export default function BoardsList() {
    const router = useRouter();
    // const boards = useStore((state) => Object.values(state.boards));
    const boards = useStore((state) => state.boards);
    const setBoards = useStore((state) => state.setBoards);
    const removeBoard = useStore((state) => state.removeBoard);
    const isCurrentUserCreated = useStore(
        (state) => state.isCurrentUserCreated
    );

    async function loadBoards() {
        const req = new Request(`https://xboard-jz9r.onrender.com/api/getboards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            const res = await fetch(req);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const fetchedBoards = await res.json();

            await setBoards(fetchedBoards);
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    }

    useEffect(() => {
        loadBoards();
    }, []);

    function handleDeletionOfBoard(event, boardId) {
        if (isCurrentUserCreated) {
            event.stopPropagation();
            removeBoard(boardId);
        } else {
            alert("Enter the name!");
        }
    }

    function handleBoardClick(boardId) {
        if (isCurrentUserCreated) {
            router.push(`/board/${boardId}`);
        } else {
            alert("Enter the name!");
        }
    }

    return (
        <div
            className="list-group pl-3 pr-3"
            style={{ height: "100vh", overflowY: "auto" }}
        >
            {Array.isArray(boards) &&
                boards.map((board) => (
                    <BoardCard
                        key={board.id}
                        handleBoardClick={() => handleBoardClick(board.id)}
                        handleDeletionOfBoard={(event) =>
                            handleDeletionOfBoard(event, board.id)
                        }
                        board={board}
                    />
                ))}
        </div>
    );
}
