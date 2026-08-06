import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/context/ProgressContext";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Home from "./pages/Home";
import SessionPlayer from "./pages/SessionPlayer";
import Devotions from "./pages/Devotions";
import Notifications from "./pages/Notifications";
import CalendarPage from "./pages/CalendarPage";
import More from "./pages/More";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <ScheduleProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/session/:sessionId" element={<SessionPlayer />} />
                <Route path="/devotions" element={<Devotions />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/more" element={<More />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </ScheduleProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
