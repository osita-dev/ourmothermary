import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/context/ProgressContext";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Home from "./pages/Home";

// Everything below is loaded on demand — its code is only downloaded the
// moment someone actually navigates to it, not bundled into the initial
// load. Home stays eager since it's the entry point and needs to be ready
// instantly.
const SessionPlayer = lazy(() => import("./pages/SessionPlayer"));
const DayReadingPage = lazy(() => import("./pages/DayReadingPage"));
const Devotions = lazy(() => import("./pages/Devotions"));
const Notifications = lazy(() => import("./pages/Notifications"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const More = lazy(() => import("./pages/More"));
// const GamePage = lazy(() => import("./pages/GamePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Small, on-brand fallback shown only during that first-visit fetch —
// not a full skeleton, just enough to avoid a blank freeze.
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <ScheduleProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/session/:sessionId" element={<SessionPlayer />} />
                  <Route path="/session/:sessionId/day/:dayNumber" element={<DayReadingPage />} />
                  <Route path="/devotions" element={<Devotions />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/more" element={<More />} />
                  {/* <Route path="/game" element={<GamePage />} /> */}
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </ScheduleProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;