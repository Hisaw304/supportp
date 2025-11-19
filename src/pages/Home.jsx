import React from "react";

import HeroHeader from "../components/HeroHeader";
import PrizeCard from "../components/PrizeCard"; // if you used PrizeCardLarge use that instead
import InfoArticle from "../components/InfoArticle";
import PrizeCardWithStreak from "../components/PrizeCardWithStreak";
import PrizeGridSection from "../components/PriceGridSection";
import CheckOutSection from "../components/CheckOutSection";
import AboutBanner from "../components/AboutBanner";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero strip */}
      <HeroHeader
        // HeroHeader uses its own background image by default; pass props if you want custom text
        eyebrow="WELCOME TO"
        title="WEEKLY GRAND PRIZES"
        bullets={["Play Games", "Earn Tokens", "Win Prizes"]}
      />

      <main className="max-w-7xl mx-auto px-6">
        {/* Large page heading - matches screenshot */}
        <header className="mt-10 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Win The $1,500,000 Megaprize
          </h1>
        </header>

        {/* Big prize card (if you created PrizeCardLarge or PrizeCard use that) */}
        <section className="mb-12">
          {/* If you used PrizeCardLarge earlier, import & use it. Here we use PrizeCard as placeholder */}
          <PrizeCard />
        </section>

        {/* Info block with "How It Works" (modal) */}
        <section className="mb-12">
          <InfoArticle />
        </section>

        {/* Weekly Grand Prizes section with streak card */}
        <section className="px-0 pb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            Weekly Grand Prizes
          </h2>
          <p className="text-gray-600 mb-6">
            We give away Grand Prizes every week like cars, vacations or cash
            and the next one could be yours!
          </p>

          {/* The streak-style card that matches screenshot */}
          <PrizeCardWithStreak />
        </section>
        <section className="mb-12">
          <PrizeGridSection />
        </section>
        <section className="mb-12">
          <CheckOutSection />
        </section>

        <section>
          <AboutBanner />
        </section>
      </main>
    </div>
  );
}
