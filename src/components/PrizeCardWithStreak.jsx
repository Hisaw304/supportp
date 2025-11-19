import React from "react";
import { Clock } from "lucide-react";
import prizeImg from "../assets/wk4210kCashBoost_image_1.jpg"; // <-- put this in src/assets

export default function PrizeCardWithStreak({
  link = "/contact",
  image = prizeImg,
  daysLeft = "1 Day Left",
  streakText = "Streak Bonus Now Live!",
  title = "Win A $10,000 Cash Boost",
  subtitle = "",
  ctaText = "VIEW PRIZE",
  gaAttrs = {},
}) {
  const dataProps = {};
  Object.entries(gaAttrs || {}).forEach(
    ([k, v]) => (dataProps[`data-${k}`] = v)
  );

  return (
    <article className="pch-article type-normal max-w-6xl mx-auto px-6">
      <div className="content">
        <a
          href={link}
          className="no-style prize-card wide e-card-middle__border block rounded-xl overflow-hidden shadow-2xl transform-gpu hover:-translate-y-1 transition-transform duration-200 bg-white"
          {...dataProps}
          aria-label={`${title}`}
        >
          {/* top-section background image */}
          <div
            className="top-section relative w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})`, height: "360px" }}
          >
            {/* fallback <img> for reliability */}
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* deadline pill */}
            <div className="absolute left-4 top-4">
              <div className="pill-banner inline-flex items-center gap-2 bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-semibold text-sm px-3 py-1 rounded-full shadow">
                <Clock size={16} aria-hidden="true" />
                <span>{daysLeft}</span>
              </div>
            </div>

            {/* thin black promo bar across bottom of the image */}
            <div className="absolute left-0 right-0 bottom-0">
              <div className="w-full bg-black text-white text-sm md:text-base px-4 py-2">
                <div className="max-w-6xl mx-auto">
                  {/* optional promoText slot */}
                </div>
              </div>
            </div>
          </div>

          {/* middle streak banner */}
          <div className="e-card-middle bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-medium text-lg py-2 flex items-center justify-center gap-3">
            <img src="/images/streak-flame-sm.svg" alt="" className="h-5 w-5" />
            <span>{streakText}</span>
          </div>

          {/* bottom white panel */}
          <div className="bottom-section bg-white px-6 py-6 md:py-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                ) : null}
              </div>

              <div className="flex-shrink-0">
                <span
                  className="inline-block bg-[#1075DF] text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95 cursor-pointer"
                  role="button"
                  aria-hidden="true"
                >
                  {ctaText}
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </article>
  );
}
