import React from "react";

/**
 * CheckOutSection
 * - Displays left-aligned <h1> with black underlined link
 * - Keeps plain ad container below
 */
export default function CheckOutSection() {
  return (
    <section
      className="target-area content-area px-6 pb-12"
      id="pch-section-content-4"
    >
      <article className="pch-article type-normal">
        <div className="content text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            <a
              href="https://rewards.pch.com/weekly-grand-prize"
              className="section-more-link-btn plain-link"
              data-ga-tealium_event="checkout_all_wgp"
              data-ga-click_name="all wgp info click"
            >
              Check out all our Weekly Grand Prizes
            </a>
          </h1>
        </div>
      </article>

      {/* Plain ad container */}
      <div className="ads-centered" style={{ marginBottom: "2rem" }}>
        <div id="div-pch-gpt-placement-bottom3"></div>
      </div>
    </section>
  );
}
