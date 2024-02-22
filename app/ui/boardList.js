"use client";
import useStore from "../store"; // Make sure to use curly braces for named export
import { useRouter } from "next/navigation";
// import Link from "next/link";

export default function BoardsList() {
    const router = useRouter();
    const boards = useStore((state) => state.boards);
    const removeBoard = useStore((state) => state.removeBoard);

    function handleDeletionOfBoard(event, boardName) {
        event.stopPropagation();
        removeBoard(boardName);
    }

    function handleBoardClick(boardId) {
        router.push(`/board/${boardId}`);
    }

    return (
        <div className="list-group pl-3 pr-3" style={{ height: '100vh', overflowY: 'auto' }}>
            {boards.map((board) => (
                <div
                    key={board.id}
                    roomId={board.id}
                    className="border rounded list-group-item d-flex justify-content-between align-items-center m-2 pt-2 pb-2" 
                    onClick={() => handleBoardClick(board.id)}
                    style={{
                        cursor: "pointer",
                        padding: '10px 15px',
                        backgroundImage: 'url(https://i.pinimg.com/564x/66/da/9c/66da9cf5b2a8b10a2dbd55bd9b8dbfbe.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '25vh',
                    }}
                >
                    <button
                        type="button"
                        className="border rounded btn-close align-self-start justify-self-bottom"
                        aria-label="Close"
                        onClick={(event) => handleDeletionOfBoard(event, board.id)}
                        style={{ backgroundColor: 'white',  opacity: 1,  position: 'absolute', top: 9, right: 9 }}
                    ></button>
                    <span className="border-top rounded list-group-item-heading text-center align-self-end w-100 rounded" style={{ position: 'absolute', bottom: 0, left: 0, padding: '5px', backgroundColor: 'white' }}>
                        {board.name}
                    </span>
                    
                </div>
            ))}
        </div>
    );
}
