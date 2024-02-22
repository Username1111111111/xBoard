"use client";
import useStore from "../store"; // Make sure to use curly braces for named export
import { useRouter } from "next/navigation";
import BoardCard from "../ui/boardCard";

export default function BoardsList() {
    const router = useRouter();
    const boards = useStore((state) => state.boards);
    const removeBoard = useStore((state) => state.removeBoard);

    function handleDeletionOfBoard(event, boardName) {
        event.stopPropagation();
        removeBoard(boardName);
    }

    function handleBoardClick(roomId) {
        router.push(`/board/${roomId}`);
    }

    return (
        <div className="list-group pl-3 pr-3" style={{ height: '100vh', overflowY: 'auto' }}>
            {boards.map((board) => (
                <BoardCard key={board.id} handleBoardClick={handleBoardClick} handleDeletionOfBoard={handleDeletionOfBoard} board={board}/>
            ))}
        </div>
    );
}
