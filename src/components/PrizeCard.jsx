import React from "react";
import { Clock } from "lucide-react";
import prizeImg from "../assets/MegaPrizeSuperprize_image_1.png"; // <-- local asset import

export default function PrizeCardLarge({
  link = "/contact",
  image = prizeImg,
  daysLeft = "3 Days Left",
  promoText = "Weekly Lotto Style Drawing",
  title = "Win Big This Saturday",
  subtitle = "This Saturday",
  ctaText = "VIEW PRIZE",
}) {
  return (
    <div className="max-w-6xl mt-8 mx-auto px-6">
      <a
        href={link}
        className="block relative rounded-xl overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-200 bg-white"
        aria-label={`${title} — ${subtitle}`}
      >
        {/* IMAGE TOP */}
        <div
          className="relative w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, height: "360px" }}
        >
          {/* Image fallback (for reliability) */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />

          {/* slight dark overlay for contrast on left side */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* deadline pill top-left */}
          <div className="absolute left-4 top-4">
            <div className="inline-flex items-center gap-2 bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-semibold text-sm px-3 py-1 rounded-full shadow">
              <Clock size={16} aria-hidden="true" />
              <span>{daysLeft}</span>
            </div>
          </div>

          {/* thin black promo bar across bottom of image */}
          <div className="absolute left-0 right-0 bottom-0">
            <div className="w-full bg-black text-white text-sm md:text-base px-4 py-2">
              <div className="max-w-6xl mx-auto">{promoText}</div>
            </div>
          </div>
        </div>

        {/* BOTTOM WHITE PANEL */}
        <div className="bg-white px-6 py-6 md:py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>

            <div>
              <span
                className="inline-block bg-[#1075DF] text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95"
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
  );
}
