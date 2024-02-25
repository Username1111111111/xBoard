import styles from "./boardCard.module.css";
export default function BoardCard({
    handleBoardClick,
    handleDeletionOfBoard,
    board,
}) {
    return (
        <div
            roomId={board.id}
            className={`${styles.boardCardContainer} border-top border-left rounded list-group-item d-flex justify-content-between align-items-center m-2 pt-2 pb-2 shadow`}
            onClick={() => handleBoardClick(board.id)}
        >
            <button
                type="button"
                className={`${styles.buttonHoverEffect} border btn-close rounded align-self-start justify-self-bottom shadow `}
                aria-label="Close"
                onClick={(event) => handleDeletionOfBoard(event, board.id)}
            >
                <svg
                    className={styles.buttonSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    width="16"
                    height="16"
                >
                    <path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z" />
                </svg>
            </button>
            <span
                className={`${styles.topShadow} rounded list-group-item-heading text-center align-self-end w-100 rounded`}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    padding: "5px",
                    backgroundColor: "white",
                }}
            >
                {board.name}
            </span>
        </div>
    );
}
