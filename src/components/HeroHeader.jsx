import React from "react";
import heroImg from "../assets/hero.jpg"; // <-- put your screenshot image here (recommended)

export default function HeroHeader({
  backgroundImage = heroImg,
  eyebrow = "WELCOME TO",
  title = "WEEKLY GRAND PRIZES",
  subtitle = "Play Games • Earn Tokens • Win Prizes",
  bullets = ["Win Cash", "Cars", "Trips & More"],
  bannerMessage = "Last Day To Enter For This Week's Grand Prize — Win A $10,000 Cash Boost",
  ctaText = "LET'S GO",
  heroHeight = { mobile: 200, desktop: 240 }, // px heights you can tweak
}) {
  const headerStyle = {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: `${heroHeight.mobile}px`,
  };

  return (
    <div>
      {/* HERO (compact) */}
      <header
        aria-label={`${title} hero`}
        className="relative w-full text-white overflow-hidden"
        style={{ ...headerStyle }}
      >
        {/* Ensure desktop height */}
        <style>{`
          @media (min-width: 768px) {
            .hero-inner { min-height: ${heroHeight.desktop}px; }
          }
        `}</style>

        {/* background img fallback (absolute) ensures visible even if CSS overridden */}
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          style={{ objectFit: "cover" }}
        />

        {/* dark gradient overlay to match screenshot contrast */}
        <div
          className="absolute inset-0 -z-5"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(9,18,33,0.85) 0%, rgba(9,18,33,0.6) 45%, rgba(9,18,33,0.2) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 hero-inner">
          <div className="mx-auto text-left md:text-center max-w-5xl flex flex-col justify-center h-full py-6 md:py-8">
            <div className="text-[var(--rm-yellow)] font-semibold tracking-wider text-xs md:text-sm mb-1">
              {eyebrow}
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-[var(--rm-yellow)] leading-tight">
              {title}
            </h1>

            {/* subtitle line (white) */}
            <div className="text-lg md:text-2xl font-semibold text-white mb-3">
              {subtitle}
            </div>

            {/* bullets row centered on md+, left on small if you prefer */}
            <ul className="mt-1 flex flex-wrap gap-3 justify-center items-center text-sm md:text-base font-medium text-white">
              {bullets.map((b, i) => (
                <React.Fragment key={b}>
                  <li className="px-2">{b}</li>
                  {i < bullets.length - 1 && (
                    <li
                      aria-hidden="true"
                      className="text-[var(--rm-yellow)] font-bold select-none"
                    >
                      •
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Thin CTA banner (yellow) with right-aligned blue pill CTA */}
      <div
        className="w-full bg-[var(--rm-yellow)] border-t border-b border-[rgba(0,0,0,0.04)]"
        role="region"
        aria-label="site banner"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-3">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm md:text-base font-semibold text-[var(--rm-gray-900)]">
              {bannerMessage}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="/"
              className="inline-block bg-[#1075DF] text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:opacity-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(16,117,223,0.16)]"
              aria-label={ctaText}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
