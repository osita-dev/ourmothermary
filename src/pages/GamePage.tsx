import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { wordPuzzles } from "@/data/word-puzzles";
import { buildTilePool } from "@/lib/game-utils";
import { SentenceCard } from "@/components/game/SentenceCard";
import { GameBoard } from "@/components/game/GameBoard";

type Status = "playing" | "correct" | "wrong";

export default function GamePage() {
    const navigate = useNavigate();
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [path, setPath] = useState<number[]>([]);
    const [status, setStatus] = useState<Status>("playing");
    const [solvedCount, setSolvedCount] = useState(0);
    const [shuffleSeed, setShuffleSeed] = useState(0);

    const puzzle = wordPuzzles[puzzleIndex];

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
            setSolvedCount((c) => c + 1);
        } else {
            setStatus("wrong");
            setTimeout(() => {
                setStatus("playing");
                setPath([]);
            }, 700);
        }
    };

    const handleNext = () => {
        setPuzzleIndex((i) => (i + 1) % wordPuzzles.length);
        setPath([]);
        setStatus("playing");
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

    // Once correct, give a moment to read the fact, then move on automatically
    // — no tap required. Cleared if the puzzle changes again before it fires.
    useEffect(() => {
        if (status !== "correct") return;
        const timer = setTimeout(() => {
            setPuzzleIndex((i) => (i + 1) % wordPuzzles.length);
            setPath([]);
            setStatus("playing");
        }, 2200);
        return () => clearTimeout(timer);
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

            {status === "correct" && (
                <div className="mx-5 mt-8 rounded-3xl bg-secondary/70 p-5 text-center">
                    <Sparkles className="mx-auto h-6 w-6 text-accent" />
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">Correct!</p>
                    {puzzle.fact && (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{puzzle.fact}</p>
                    )}
                    
                </div>
            )}
        </div>
    );
}