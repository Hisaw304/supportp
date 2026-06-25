import React, { useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

/**
 * Footer with newsletter signup, social icons, and link groups
 * - Newsletter posts to /api/subscribe (demo)
 * - No external CSS libraries required beyond styles.css + Tailwind
 */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, ok, error

  async function subscribe(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    // Demo: fake delay
    try {
      await new Promise((res) => setTimeout(res, 700));
      setStatus("ok");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Reward", href: "/contact" },
    { name: "Games", href: "/contact" },
    { name: "Answer/Win", href: "/contact" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "var(--rm-gray-900)",
        color: "var(--rm-white)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + small copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="footer-mark flex items-center justify-center rounded-md font-extrabold text-[var(--rm-gray-900)] bg-[var(--rm-yellow)] w-10 h-10">
                PCH
              </div>
              <div>
                <div className="text-[var(--rm-yellow)] font-extrabold">
                  Publishers Clearing House
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.6)]">
                  Play, answer & win simple.
                </div>
              </div>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.6)]">
              Built for modern reward hunters. Terms & privacy apply.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-[rgba(255,255,255,0.8)]">
                {links.slice(0, 3).map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="footer-link text-sm relative nav-link hover:opacity-90"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Explore
              </h4>
              <ul className="space-y-2 text-[rgba(255,255,255,0.8)]">
                {links.slice(3).map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="footer-link text-sm relative nav-link hover:opacity-90"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Join newsletter
            </h4>
            <form
              onSubmit={subscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.03)] placeholder:text-gray-300 focus:ring-2 focus:ring-[var(--rm-yellow)]"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[var(--rm-yellow)] text-[var(--rm-gray-900)] font-semibold"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Joining..." : "Join"}
              </button>
            </form>

            {status === "ok" && (
              <p className="mt-2 text-sm text-green-400">
                Thanks — you're subscribed!
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 text-sm text-red-400">
                Oops — something went wrong.
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <a
                aria-label="Facebook"
                className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)]"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)]"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                aria-label="Instagram"
                className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)]"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[rgba(255,255,255,0.04)] pt-6 text-sm text-[rgba(255,255,255,0.6)] flex items-center justify-between">
          <div>© {new Date().getFullYear()} RewardMe — All rights reserved</div>
          <div className="flex gap-4">
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
