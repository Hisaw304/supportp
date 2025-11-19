import React from "react";
import PrizeCardSmall from "./PrizeCardSmall";
import fundFutureImg from "../assets/wk4310kFundYourFuture_image_1.png";

/**
 * PrizeGridSection — single prominent card centered
 */
export default function PrizeGridSection() {
  const card = {
    link: "https://rewards.pch.com/weekly-grand-prize/prize/10k-fund-future",
    image: fundFutureImg,
    pill: "Oct 23",
    title: "Win $10,000 To Fund Your Future",
    subtitle: "",
    ctaText: "View Prize",
    gaAttrs: {
      "ga-tealium_event": "more_prize_click",
      "ga-click_location": "home page",
      "ga-click_name": "view prize",
      "ga-prize_id": "10k-fund-future",
      "ga-game_name": "Win $10,000 To Fund Your Future",
      "ga-prize_value": "10000",
    },
  };

  return (
    <section
      className="target-area content-area px-6 pb-12"
      id="pch-section-content-3"
    >
      <article className="pch-article type-normal">
        <div className="max-w-7xl mx-auto">
          {/* center and cap width for single larger card */}
          <div className="flex justify-center">
            <div className="w-full">
              <PrizeCardSmall {...card} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
