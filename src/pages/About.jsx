// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import PrizeCard from "../components/PrizeCard"; // your existing PrizeCard
import HeroHeader from "../components/HeroHeader";

export default function About() {
  return (
    <div>
      <HeroHeader />
      <main className="about-page min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-gray-50">
        {/* HERO */}
        <section className="max-w-6xl mx-auto mb-10">
          <div
            className="rounded-[var(--rm-radius)] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-about bg-[var(--rm-white)]"
            aria-labelledby="about-hero-title"
          >
            <div className="flex-1">
              <h1
                id="about-hero-title"
                className="text-3xl md:text-4xl font-extrabold mb-3 text-[var(--rm-gray-900)]"
              >
                About PCH Support
              </h1>
              <p className="text-base leading-relaxed mb-4 text-[var(--rm-gray-900)]/90">
                Prize promotions can be exciting and sometimes confusing. This
                page explains how PCH promotions work, how to enter, what
                happens if you win, and the support we provide to make the
                process transparent, fair, and safe.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                  role="button"
                  aria-label="Contact PCH Support"
                >
                  Contact Support
                </Link>

                <a
                  href="#how-to-win"
                  className="btn-secondary inline-flex items-center justify-center"
                  aria-label="Learn how to win"
                >
                  How to Win
                </a>
              </div>
            </div>

            <div className="w-full md:w-80 flex-shrink-0">
              <div className="visual-box p-5 rounded-lg border">
                <div className="text-sm font-semibold mb-2">
                  Your chance to win
                </div>
                <div className="text-xs leading-snug">
                  Promotions are run regularly — enter the ones you're eligible
                  for, follow the rules, and keep your contact info current.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO WIN */}
        <section id="how-to-win" className="max-w-6xl mx-auto mb-8">
          <div className="rounded-[var(--rm-radius)] p-6 shadow-about bg-[var(--rm-white)] border">
            <h2 className="text-2xl font-bold mb-3 text-[var(--rm-gray-900)]">
              How to Win
            </h2>
            <p className="mb-4 text-[var(--rm-gray-900)]/90">
              Winning starts with entering official promotions. Read each
              promotion&apos;s rules to confirm eligibility, enter through the
              provided official method, and retain proof of your entry
              (screenshots or emails).
            </p>

            <ol className="list-decimal list-inside space-y-2 pl-4 text-[var(--rm-gray-900)]/90">
              <li>
                Find active promotions and read the official rules and
                eligibility.
              </li>
              <li>
                Enter only through the official entry form or method listed.
              </li>
              <li>
                Keep your contact details accurate so official communications
                can reach you.
              </li>
            </ol>
          </div>
        </section>

        {/* PRIZE CARD (your existing component inserted here) */}
        <section className="max-w-6xl mx-auto mb-10">
          <div className="prizecard-wrapper rounded-[var(--rm-radius)] overflow-hidden border">
            {/* PrizeCard: you said you already built this — it will render here */}
            <PrizeCard />
          </div>
        </section>

        {/* SUPPORT & SAFETY */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="rounded-[var(--rm-radius)] p-6 shadow-about bg-[var(--rm-white)] border">
            <h3 className="text-xl font-semibold mb-3 text-[var(--rm-gray-900)]">
              Support for Entrants
            </h3>
            <p className="mb-3 text-[var(--rm-gray-900)]/90">
              We provide verification help, scam-prevention guidance, and
              responsive support to ensure entrants and winners are protected
              and informed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <article
                className="support-card p-4 rounded-lg"
                aria-labelledby="support-verify"
              >
                <h4 id="support-verify" className="font-semibold mb-2">
                  Verification
                </h4>
                <p className="text-sm">
                  We verify official winner notifications and advise on next
                  steps.
                </p>
              </article>

              <article
                className="support-card p-4 rounded-lg"
                aria-labelledby="support-scam"
              >
                <h4 id="support-scam" className="font-semibold mb-2">
                  Scam Prevention
                </h4>
                <p className="text-sm">
                  We teach how to recognize impostor messages and protect your
                  personal information.
                </p>
              </article>

              <article
                className="support-card p-4 rounded-lg"
                aria-labelledby="support-access"
              >
                <h4 id="support-access" className="font-semibold mb-2">
                  Accessibility
                </h4>
                <p className="text-sm">
                  Support is available for accessibility needs — reach out via
                  the contact form.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* WHEN FOUND */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="rounded-[var(--rm-radius)] p-6 shadow-about bg-[var(--rm-white)] border">
            <h3 className="text-xl font-semibold mb-3 text-[var(--rm-gray-900)]">
              When a Winner Is Found
            </h3>
            <p className="mb-3 text-[var(--rm-gray-900)]/90">
              If you are selected, official communications will come directly
              from an official domain and will never request money or passwords.
              Below are what to expect and how we help:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-[var(--rm-gray-900)]/90">
              <li>
                Contact via the email/phone you provided — official messages use
                recognizable domains.
              </li>
              <li>
                Clear instructions for claiming your prize are provided; we help
                you validate those steps.
              </li>
              <li>We never request payment to release a legitimate prize.</li>
            </ul>
          </div>
        </section>

        {/* GOALS & MISSION */}
        <section className="max-w-6xl mx-auto mb-10">
          <div className="rounded-[var(--rm-radius)] p-6 shadow-about bg-[var(--rm-white)] border">
            <h3 className="text-xl font-semibold mb-3 text-[var(--rm-gray-900)]">
              Our Goals
            </h3>
            <p className="mb-3 text-[var(--rm-gray-900)]/90">
              We exist to make prize promotions transparent, safe, and
              accessible. Our key commitments:
            </p>

            <ul className="list-inside space-y-2 pl-4 text-[var(--rm-gray-900)]/90">
              <li>
                <strong>Transparency:</strong> Clear rules and communication for
                each promotion.
              </li>
              <li>
                <strong>Support:</strong> Helpful, timely assistance for
                entrants and winners.
              </li>
              <li>
                <strong>Education:</strong> Teach people how to spot scams and
                protect themselves.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-block p-8 rounded-[var(--rm-radius)] shadow-about bg-[var(--rm-white)] border cta-card">
            <h4 className="text-lg font-bold mb-3 text-[var(--rm-gray-900)]">
              Need help or have questions?
            </h4>
            <p className="mb-6 text-[var(--rm-gray-900)]/90">
              Our support team is ready to help you verify claims and guide you
              through the process.
            </p>
            <Link
              to="/contact"
              className="btn-primary-large"
              role="button"
              aria-label="Contact Support - Footer"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
