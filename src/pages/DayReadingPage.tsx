import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionById } from "@/data/sessions";

export default function DayReadingPage() {
    const { sessionId, dayNumber } = useParams<{ sessionId: string; dayNumber: string }>();
    const navigate = useNavigate();

    const session = sessionId ? getSessionById(sessionId) : undefined;
    const currentDay = Number(dayNumber);
    const days = session?.days ?? [];
    const day = days.find((d) => d.dayNumber === currentDay);

    if (!session || !day) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
                <p className="font-heading text-lg font-semibold text-foreground">
                    This day's reading could not be found.
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const isFirst = currentDay <= 1;
    const isLast = currentDay >= days.length;

    // Back arrow always returns to the 3x3 day grid — independent of
    // whatever day Previous/Next has navigated to.
    const backToGrid = () => navigate(`/session/${session.id}`, { replace: true });
    const goToDay = (n: number) => navigate(`/session/${session.id}/day/${n}`, { replace: true });

    return (
        <div className="flex min-h-screen flex-col bg-background pb-28">
            <div className="sticky top-0 z-20 flex items-center justify-between bg-background/95 px-5 pt-5 pb-2 backdrop-blur">
                <button
                    type="button"
                    onClick={backToGrid}
                    aria-label="Back to day grid"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
                >
                    <ArrowLeft className="h-5 w-5 text-primary" />
                </button>
                <h2 className="font-heading text-base font-semibold text-foreground">
                    {session.title_en}
                </h2>
                <div className="h-10 w-10" />
            </div>

            <div className="mt-8 flex flex-1 flex-col items-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
                    {day.dayNumber}
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">{day.title_en}</h3>
                <div className="my-3 h-0.5 w-10 rounded-full bg-accent" />
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
                    {day.body_en}
                </p>
            </div>

            <div className="fixed inset-x-0 bottom-0 bg-background px-5 pb-6 pt-3">
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => goToDay(currentDay - 1)}
                        disabled={isFirst}
                        className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-4 font-heading text-base font-semibold text-foreground disabled:opacity-40"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => goToDay(currentDay + 1)}
                        disabled={isLast}
                        className="flex flex-1 items-center justify-center gap-1 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground disabled:opacity-40"
                    >
                        Next
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}