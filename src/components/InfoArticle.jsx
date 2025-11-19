import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import popupBg from "../assets/popup-bg.jpg"; // <-- ensure this exists

export default function InfoArticle({
  paragraph = "As America's favorite sweepstakes, Publishers Clearing House could make you our next big winner! Play games, redeem tokens, and enter sweepstakes – all for chances to win real prizes!",
  gaAttrs = {
    "ga-tealium_event": "checkout_all_wgp",
    "ga-click_name": "pch_giveaways-info",
    "ga-click_location": "home page",
  },
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);

  // convert gaAttrs -> data-*
  const dataProps = {};
  Object.entries(gaAttrs || {}).forEach(
    ([k, v]) => (dataProps[`data-${k}`] = v)
  );

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // focus management and ESC/tab trap
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      setTimeout(
        () => (closeBtnRef.current ? closeBtnRef.current.focus() : null),
        10
      );
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  const modal = open
    ? createPortal(
        <div
          className="findout-overlay fixed inset-0 z-[99999] flex items-center justify-center px-4"
          onClick={onBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="How It Works"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.58)",
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${popupBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(3px) saturate(0.9)",
              opacity: 0.16,
              zIndex: 1,
            }}
          />
          <div
            ref={modalRef}
            className="findout-popup relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-auto"
            style={{ maxHeight: "85vh" }}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="popup-closebtn absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(17,17,17,0.06)]"
            >
              ×
            </button>

            <div className="popup-content px-6 py-6 md:px-8 md:py-8 text-gray-800">
              <h3 className="text-xl font-bold mb-3">How It Works:</h3>
              <div className="mb-4 text-sm text-gray-700">
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    PCH powers daily, weekly, and monthly sweepstakes by
                    introducing you to our sponsors and advertising partners.
                  </li>
                  <li>
                    You can enter our sweepstakes every day through the PCH.com
                    homepage, our various sites and apps, and through the PCH
                    Rewards center using Tokens.
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mb-2">Important Details:</h3>
              <div className="text-sm text-gray-700">
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Yes, it’s real! There are winners every day at Publishers
                    Clearing House.
                  </li>
                  <li>
                    Winners of prizes valued at $10,000 or more are typically
                    notified in person with a big check!
                  </li>
                  <li>
                    Playing and winning with PCH is 100% free. We will never ask
                    a winner to pay to claim a prize.
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-block bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] px-4 py-2 rounded-md font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(246,195,0,0.14)]"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <article className="pch-article type-normal max-w-4xl mx-auto px-6">
      <div className="content">
        <section className="pch-info-paragraph text-gray-700 leading-relaxed mb-6">
          <p dangerouslySetInnerHTML={{ __html: paragraph }} />
        </section>

        <button
          {...dataProps}
          ref={triggerRef}
          onClick={() => setOpen(true)}
          className="findout-btn inline-block bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-semibold px-4 py-2 rounded-md shadow-sm hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(246,195,0,0.14)]"
        >
          How It Works
        </button>
      </div>

      {modal}
    </article>
  );
}
