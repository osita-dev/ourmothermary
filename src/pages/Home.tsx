import { useState } from "react";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { TodayCard } from "@/components/home/TodayCard";
import { ProgressCard } from "@/components/home/ProgressCard";
import { DevotionsGrid } from "@/components/home/DevotionsGrid";
import { QuoteCard } from "@/components/home/QuoteCard";
import { BottomNav } from "@/components/home/BottomNav";
import { HamburgerDrawer } from "@/components/menu/HamburgerDrawer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Hero />
      <TodayCard />
      <ProgressCard />
      <DevotionsGrid />
      <QuoteCard />
      <BottomNav />
      <HamburgerDrawer open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  );
}
