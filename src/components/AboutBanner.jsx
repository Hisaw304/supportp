import React from "react";

/**
 * AboutBanner
 * - Matches the HTML structure you supplied
 * - Yellow background, black text
 * - Responsive 4 info-cards with icons and emphasized spans
 * - Keeps semantic markup and small accessibility touches
 *
 * Usage: <AboutBanner />
 *
 * If you prefer local assets, replace the URLs in `cards` with imports from src/assets.
 */
export default function AboutBanner() {
  const cards = [
    {
      img: "https://cdn.pch.com/emailimages/EmailTransformation/_site/gold_footer/check.svg",
      alt: "check icon",
      label: ["Home of the", "SUPERPRIZE!"],
    },
    {
      img: "https://cdn.pch.com/emailimages/EmailTransformation/_site/gold_footer/cash.svg",
      alt: "cash icon",
      label: ["Winners", "EVERY DAY!"],
    },
    {
      img: "https://cdn.pch.com/emailimages/EmailTransformation/_site/gold_footer/moneyBag.svg",
      alt: "money bag icon",
      label: ["Drawings", "EVERY NIGHT!"],
    },
    {
      img: "https://cdn.pch.com/emailimages/EmailTransformation/_site/gold_footer/trophy.svg",
      alt: "trophy icon",
      label: ["Grand Prizes", "EVERY WEEK!"],
    },
  ];

  return (
    <section id="pch-section-content-bottom" className="target-area">
      <div
        className="elevate-about-banner full-bleed"
        style={{ backgroundColor: "#f6c300", color: "#111" }}
        aria-labelledby="about-banner-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <h2
            id="about-banner-heading"
            className="section-title text-left md:text-left text-black leading-tight"
            style={{ lineHeight: 1.08 }}
          >
            <span
              className="block uppercase font-extrabold text-xl md:text-2xl tracking-tight"
              style={{ letterSpacing: ".4px" }}
            >
              AMERICA'S FAVORITE SWEEPSTAKES!
            </span>
            <span className="block mt-2 text-lg md:text-xl font-semibold">
              Over $492 Million Awarded To Winners All Across The Country Since
              1967.
            </span>
          </h2>

          <div className="section-details mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 items-start">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="info-card flex items-center gap-3"
                  role="group"
                  aria-label={`${c.label[0]} ${c.label[1]}`}
                >
                  <img
                    src={c.img}
                    alt={c.alt || ""}
                    width={
                      c.img.includes("trophy")
                        ? 50
                        : c.img.includes("moneyBag")
                        ? 39
                        : c.img.includes("cash")
                        ? 32
                        : 35
                    }
                    height={32}
                    className="flex-none"
                    style={{ display: "block" }}
                    loading="lazy"
                  />

                  <p className="text leading-tight text-black">
                    <span className="block text-sm md:text-base font-medium -mb-0.5">
                      {c.label[0]}
                    </span>
                    <span className="block text-base md:text-lg font-extrabold mt-0.5">
                      {c.label[1]}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
