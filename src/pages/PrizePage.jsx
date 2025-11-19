import React, { useEffect, useState, useRef } from "react";
import { FiClock, FiHelpCircle } from "react-icons/fi";
import { GiTrophy } from "react-icons/gi";
import prizesData from "../data/prizes.json";
import HeroHeader from "../components/HeroHeader";

export default function PrizePage() {
  const [prizes] = useState(prizesData);
  const [selectedId, setSelectedId] = useState(prizes[0]?.id ?? null);
  const selected = prizes.find((p) => p.id === selectedId) || prizes[0];
  const topRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const idx = prizes.findIndex((p) => p.id === selectedId);
      if (idx === -1) return;
      if (e.key === "ArrowLeft") setSelectedId(prizes[Math.max(0, idx - 1)].id);
      if (e.key === "ArrowRight")
        setSelectedId(prizes[Math.min(prizes.length - 1, idx + 1)].id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prizes, selectedId]);

  const thumbnails = prizes.filter((p) => p.id !== selectedId); // all others

  const handleOneClick = (e) => {
    const el = e.currentTarget;
    if (el.dataset.clicked) {
      e.preventDefault();
      return;
    }
    el.dataset.clicked = "true";
    el.style.pointerEvents = "none";
  };

  const handleSelectAndScroll = (id) => {
    setSelectedId(id);
    setTimeout(() => {
      if (topRef.current)
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <article className="main__body" ref={topRef}>
      <HeroHeader />
      {/* Container: centered on small/medium, left-aligned start on large screens */}
      <div className="container-wrap">
        {/* MAIN SECTION (big/top card) */}
        <div className="content-wrap">
          <section className="target-area" id="pch-section-content-1">
            <article className="prize-section">
              <div className="prize-title-area">
                {/* LEFT: Image */}
                <div className="left">
                  <div className="image-wrap">
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="bg-img"
                    />
                    <div className="pill-banner pill-top-left">
                      <FiClock className="pill-clock" />
                      <span className="pill-text">{selected.pillText}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Meta */}
                <div className="right">
                  <h1 className="big-title">{selected.title}</h1>

                  <section className="deadlines">
                    <hr className="thin-hr" />
                    <h3 className="dates-heading">Dates to Know:</h3>

                    <div className="deadline-row">
                      <FiClock className="meta-icon" />
                      <p className="meta-text">
                        Last Day To Enter {selected.lastDayToEnter}
                      </p>
                      <button className="help-btn" aria-label="last day info">
                        <FiHelpCircle className="help-icon" />
                      </button>
                    </div>

                    <div className="deadline-row">
                      <GiTrophy className="meta-icon" />
                      <p className="meta-text">
                        Winner is Selected {selected.winnerSelected}
                      </p>
                      <button className="help-btn" aria-label="winner info">
                        <FiHelpCircle className="help-icon" />
                      </button>
                    </div>

                    <hr className="thin-hr" />
                  </section>

                  <div className="pill-wrapper">
                    <div className="entryRemaining_banner">
                      <span className="entry-icon" aria-hidden>
                        🎟️
                      </span>
                      <span className="entry-text">
                        {selected.entriesRemaining}
                      </span>
                    </div>

                    <button className="help-btn" aria-label="entries info">
                      <FiHelpCircle className="help-icon" />
                    </button>
                  </div>

                  <div className="cta-links-and-button">
                    <a
                      className="enter-btn"
                      href={selected.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOneClick}
                      aria-label="Enter To Win"
                    >
                      Enter To Win
                    </a>

                    <div className="link-list">
                      <a
                        className="rule-link"
                        href={`https://rules.pch.com/viewrulesfacts?mailid=${selected.id}#rules`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Rules
                      </a>
                      <a
                        className="rule-link"
                        href={`https://rules.pch.com/viewrulesfacts?mailid=${selected.id}#facts`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sweepstakes Facts
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRIZE DETAILS (big card) */}
              <section className="prize-info-wrapper">
                <h2 className="section-title">Prize Details</h2>
                <div className="prize-details two-columns">
                  <div className="left-col">
                    <dl>
                      <dt>Prize:</dt>
                      <dd>{selected.prize}</dd>
                      <dt>Giveaway Number</dt>
                      <dd>{selected.giveawayNumber}</dd>
                    </dl>
                  </div>

                  <div className="right-col">
                    <dl className="prize-desc">
                      <dt>Description</dt>
                      <dd>{selected.description}</dd>
                    </dl>
                  </div>
                </div>
              </section>
            </article>
          </section>
        </div>

        {/* DIVIDER separating main/top section from below small-cards */}
        <div className="section-divider" role="separator" aria-hidden></div>

        {/* BELOW SECTION: heading + intro + small cards */}
        <div className="below-wrap">
          <section
            className="small-cards-section"
            aria-labelledby="small-cards-heading"
          >
            <h2 id="small-cards-heading" className="small-section-title">
              The Winning Never Stops
            </h2>
            <div className="small-section-intro">
              <p>
                Week after week you could bring home another prize worth $10,000
                or more. Get your entries in now.
              </p>
            </div>

            <div className="thumbnail-grid" aria-live="polite">
              {thumbnails.map((p) => (
                <article key={p.id} className="thumbnail-card" role="article">
                  <div className="thumbnail-media">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="thumbnail-image"
                    />
                    <div className="thumb-pill">
                      <FiClock className="thumb-pill-icon" />
                      <span className="thumb-pill-text">{p.pillText}</span>
                    </div>
                    {p.prizeValue ? (
                      <div className="badge">
                        ${p.prizeValue.toLocaleString()}
                      </div>
                    ) : null}
                  </div>

                  <div className="thumbnail-body">
                    <h3 className="thumbnail-title">{p.title}</h3>

                    <div className="thumbnail-actions">
                      <button
                        className="view-btn"
                        onClick={() => handleSelectAndScroll(p.id)}
                        aria-label={`View prize ${p.title}`}
                      >
                        View Prize
                      </button>
                      <a className="details-link" href={`#`} aria-hidden>
                        Details
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
