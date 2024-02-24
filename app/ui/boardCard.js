import styles from './boardCard.module.css';
export default function BoardCard({handleBoardClick, handleDeletionOfBoard, board}) {
    return (
        <div
            roomId={board.id}
            className={`boardCardContainer border-top border-left rounded list-group-item d-flex justify-content-between align-items-center m-2 pt-2 pb-2 shadow ${styles.boardCardContainer}`}
            onClick={() => handleBoardClick(board.id)}
            style={{
                cursor: "pointer",
                padding: "10px 15px",
                backgroundImage:
                    "url(https://i.pinimg.com/564x/66/da/9c/66da9cf5b2a8b10a2dbd55bd9b8dbfbe.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "25vh",
            }}
        >
            <button
                type="button"
                className={`border btn-close rounded align-self-start justify-self-bottom shadow ${styles.buttonHoverEffect}`}
                aria-label="Close"
                onClick={(event) => handleDeletionOfBoard(event, board.id)}
                style={{
                    backgroundColor: "white",
                    opacity: 1,
                    position: "absolute",
                    top: 9,
                    right: 9,
                }}
            ></button>
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
