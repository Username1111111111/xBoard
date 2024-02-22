import BoardsList from "./ui/boardList";
import BoardInput from "./ui/boardInput";

export default function Home() {
    return (
        <main className="container-fluid p-0 position-relative overflow-hidden" style={{ height: '100vh' }}>
            <div className="row h-100">
                <div className="col-3 overflow-auto">
                    <BoardsList />
                </div>
            </div>
            <div className="position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-100">
                    <BoardInput />
                </div>
            </div>
        </main>
    );
}