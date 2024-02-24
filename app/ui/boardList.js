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

    async function loadBoards() {
        const req = new Request(`http://localhost:3000/api/getboards`, {
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
        event.stopPropagation();
        removeBoard(boardId);
    }

    function handleBoardClick(boardId) {
        router.push(`/board/${boardId}`); 
    }

    return (
        <div className="list-group pl-3 pr-3" style={{ height: '100vh', overflowY: 'auto' }}>
            {Array.isArray(boards) && boards.map((board) => (
                <BoardCard
                    key={board.id}
                    handleBoardClick={() => handleBoardClick(board.id)}
                    handleDeletionOfBoard={(event) => handleDeletionOfBoard(event, board.id)}
                    board={board}
                />
            ))}
        </div>
    );
}
