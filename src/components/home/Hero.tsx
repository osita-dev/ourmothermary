import { Heart } from "lucide-react";
import { getGreeting } from "@/lib/date-utils";
import OMPH from "@/assets/OMPH.jpg"

export function Hero() {
  const greeting = getGreeting();

  return (
    <div className="relative flex items-center gap-4 px-5 pt-6">
      <div className="flex-1">
        <p className="font-heading text-xl font-medium text-foreground">{greeting}</p>
        <h1 className="font-heading text-4xl font-semibold text-foreground">Welcome!</h1>
        <div className="my-2 h-1 w-14 rounded-full bg-accent" />
        <p className="text-base text-muted-foreground">
          Our Mother of Perpetual Help,
          <br />
          pray for us. <Heart className="inline h-4 w-4 text-accent" fill="currentColor" />
        </p>
      </div>
     
      <div className="flex shrink-0 items-center justify-center rounded-3xl">
       <img src={OMPH} alt="Our Mother of Perpetual Help" className="h-40 w-100% rounded-3xl" />
       {/* <Heart className="h-14 w-14 text-primary" strokeWidth={1.5} /> */}
      </div>
    </div>
  );
}
