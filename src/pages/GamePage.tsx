import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, RotateCcw } from "lucide-react";
import { wordPuzzles } from "@/data/word-puzzles";
import { buildTilePool, createShuffledOrder } from "@/lib/game-utils";
import { SentenceCard } from "@/components/game/SentenceCard";
import { GameBoard } from "@/components/game/GameBoard";


const GAME_STATE_KEY = "moph.game.state";

interface StoredGameState {
    order: number[];
    orderPos: number;
    solvedCount: number;
}

// Resumes an in-progress session exactly as it was left. Only generates a
// fresh random order when there's genuinely nothing saved yet (first visit,
// or storage was cleared) — a reload of an active session must not reshuffle.
function loadGameState(totalPuzzles: number): StoredGameState {
    try {
        const raw = localStorage.getItem(GAME_STATE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw) as StoredGameState;
            if (Array.isArray(parsed.order) && parsed.order.length === totalPuzzles) {
                return parsed;
            }
        }
    } catch {
        // fall through to a fresh session
    }
    return { order: createShuffledOrder(totalPuzzles), orderPos: 0, solvedCount: 0 };
}

function saveGameState(state: StoredGameState) {
    try {
        localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch {
        // ignore
    }
}

type Status = "playing" | "correct" | "wrong";

export default function GamePage() {
    const navigate = useNavigate();

    const [gameState, setGameState] = useState(() => loadGameState(wordPuzzles.length));
    const { order, orderPos, solvedCount } = gameState;

    const [path, setPath] = useState<number[]>([]);
    const [status, setStatus] = useState<Status>("playing");


    const [shuffleSeed, setShuffleSeed] = useState(0);

    const puzzle = wordPuzzles[order[orderPos]];

    // When a full random pass finishes, generate a fresh random order for
    // the next round rather than repeating the same path.
    const advanceToNextPuzzle = () => {
        setGameState((prev) =>
            prev.orderPos + 1 >= prev.order.length
                ? { ...prev, order: createShuffledOrder(wordPuzzles.length), orderPos: 0 }
                : { ...prev, orderPos: prev.orderPos + 1 }
        );
    };

    const tiles = useMemo(
        () => buildTilePool(puzzle.answer, puzzle.distractorLetters),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [puzzle.id, shuffleSeed]
    );

    const tileById = useMemo(() => {
        const map = new Map<number, string>();
        tiles.forEach((t) => map.set(t.tileId, t.letter));
        return map;
    }, [tiles]);

    const currentLetters = path.map((id) => tileById.get(id) ?? "");

    const handleRelease = () => {
        const attempt = currentLetters.join("");
        if (attempt.length === 0) return;
        if (attempt === puzzle.answer) {
            setStatus("correct");
            setGameState((prev) => ({ ...prev, solvedCount: prev.solvedCount + 1 }));
        } else {
            setStatus("wrong");
            setTimeout(() => {
                setStatus("playing");
                setPath([]);
            }, 700);
        }
    };

    const handleShuffle = () => {
        setPath([]);
        setShuffleSeed((s) => s + 1);
    };

    const handleHint = () => {
        if (status !== "playing") return;
        const nextIndex = path.length;
        if (nextIndex >= puzzle.answer.length) return;
        const neededLetter = puzzle.answer[nextIndex];
        const availableTile = tiles.find(
            (t) => t.letter === neededLetter && !path.includes(t.tileId)
        );
        if (availableTile) {
            setPath((p) => [...p, availableTile.tileId]);
        }
    };

    useEffect(() => {
        saveGameState(gameState);
    }, [gameState]);

    // Once correct, give a moment to read the fact, then move on automatically
    // — no tap required. Cleared if the puzzle changes again before it fires.
    useEffect(() => {
        if (status !== "correct") return;
        const timer = setTimeout(() => {
            advanceToNextPuzzle();
            setPath([]);
            setStatus("playing");
        }, 2200);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <div className="min-h-screen bg-background pb-10">
            <div className="sticky top-0 z-20 flex items-center justify-between bg-background/95 px-5 pt-5 pb-2 backdrop-blur">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
                >
                    <ArrowLeft className="h-5 w-5 text-primary" />
                </button>
                <div className="text-center">
                    <p className="font-heading text-base font-semibold text-foreground">Word of Faith</p>
                    <p className="text-xs text-muted-foreground">Solved: {solvedCount}</p>
                </div>
                <div className="h-10 w-10" />
            </div>

            <div className="mt-4">
                <SentenceCard puzzle={puzzle} currentLetters={currentLetters} status={status} />
            </div>

            <div className="mt-10">
                <GameBoard
                    tiles={tiles}
                    path={path}
                    onPathChange={setPath}
                    onRelease={handleRelease}
                    disabled={status !== "playing"}
                />
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={handleHint}
                    aria-label="Hint"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card"
                >
                    <Lightbulb className="h-5 w-5 text-accent-dark" />
                </button>
                <button
                    type="button"
                    onClick={handleShuffle}
                    aria-label="Shuffle"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card"
                >
                    <RotateCcw className="h-5 w-5 text-primary" />
                </button>
            </div>

        </div>
    );
}