import React from "react";
import { Clock } from "lucide-react";

/**
 * PrizeCardSmall (upgraded)
 * - Larger visual weight: tall image, bigger title, stronger CTA
 * - Props: link, image, pill, title, subtitle, ctaText, gaAttrs
 */
export default function PrizeCardSmall({
  link = "/contact",
  image = "",
  pill = "",
  title = "Prize Title",
  subtitle = "",
  ctaText = "View Prize",
  gaAttrs = {},
}) {
  const dataProps = {};
  Object.entries(gaAttrs || {}).forEach(
    ([k, v]) => (dataProps[`data-${k}`] = v)
  );

  return (
    <div className="prize-grid-item">
      <a
        href={link}
        className="no-style prize-card-wide block rounded-2xl overflow-hidden shadow-2xl bg-white"
        {...dataProps}
        aria-label={title}
      >
        {/* TOP IMAGE SECTION — much taller now */}
        <div
          className="top-section relative w-full bg-cover bg-center"
          style={{ height: "420px", backgroundImage: `url(${image})` }}
        >
          {/* fallback img */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />

          {/* pill banner top-left */}
          <div className="absolute left-5 top-5">
            <div className="pill-banner inline-flex items-center gap-2 bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-semibold text-base px-4 py-2 rounded-full shadow">
              <Clock size={16} aria-hidden="true" />
              <span>{pill}</span>
            </div>
          </div>

          {/* thin black promo bar along bottom of image */}
          <div className="absolute left-0 right-0 bottom-0">
            <div className="w-full bg-black text-white text-sm md:text-base px-4 py-2">
              <div className="max-w-6xl mx-auto">
                Weekly Lotto Style Drawing
              </div>
            </div>
          </div>
        </div>

        {/* optional middle streak (kept small) */}
        {/* <div className="e-card-middle bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-medium text-lg py-2 flex items-center justify-center gap-3">
          <img src="/images/streak-flame-sm.svg" alt="" className="h-5 w-5" />
          <span>Streak Bonus Now Live!</span>
        </div> */}

        {/* BOTTOM PANEL — larger padding, bold title */}
        <div className="bottom-section bg-white px-8 py-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1 pr-6">
              <h2 className="text-lg md:text-xl font-bold leading-snug text-gray-900">
                {title}
              </h2>
              {subtitle ? (
                <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
              ) : null}
            </div>

            <div className="flex-shrink-0">
              <a
                href={link}
                className="inline-block bg-[#1075DF] text-white px-4 py-2 rounded-full font-semibold shadow"
                role="button"
                aria-hidden="true"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
