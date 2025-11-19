import React, { useState } from "react";
import HeroHeader from "../components/HeroHeader";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // --- VALIDATION ---
    const newErrors = {
      name: !form.name.value.trim(),
      email:
        !form.email.value.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value),
      address: !form.address.value.trim(),
    };

    setErrors(newErrors);

    // If any error exists, stop here
    if (Object.values(newErrors).some(Boolean)) return;

    // --- BUILD PAYLOAD ---
    const formData = {
      name: form.name.value,
      email: form.email.value,
      address: form.address.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setTicketId(data.ticketId);
        setStatus("success");
        form.reset();
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div>
      <HeroHeader />
      <div className="max-w-xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[var(--rm-gray-900)] mb-8">
          Contact PCH Support
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[var(--rm-radius)] shadow space-y-6"
          noValidate
        >
          {/* NAME FIELD */}
          <div className="flex flex-col">
            <label className="font-semibold text-[var(--rm-gray-900)] mb-1">
              Name
            </label>
            <input
              name="name"
              required
              className="w-full border rounded-lg p-3 focus:ring-4 focus:ring-[var(--rm-yellow)] focus:border-[var(--rm-yellow)] outline-none transition"
              placeholder="Your full name"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">
                Please fill out this field.
              </span>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="flex flex-col">
            <label className="font-semibold text-[var(--rm-gray-900)] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg p-3 focus:ring-4 focus:ring-[var(--rm-yellow)] focus:border-[var(--rm-yellow)] outline-none transition"
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">
                Please enter a valid email.
              </span>
            )}
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col">
            <label className="font-semibold text-[var(--rm-gray-900)] mb-1">
              Address
            </label>
            <textarea
              name="address"
              rows="2"
              required
              className="w-full border rounded-lg p-3 focus:ring-4 focus:ring-[var(--rm-yellow)] focus:border-[var(--rm-yellow)] outline-none transition"
              placeholder="Street, City, State, ZIP"
            />
            {errors.address && (
              <span className="text-red-600 text-sm mt-1">
                Please fill out this field.
              </span>
            )}
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col">
            <label className="font-semibold text-[var(--rm-gray-900)] mb-1">
              Message (Optional)
            </label>
            <textarea
              name="message"
              rows="4"
              className="w-full border rounded-lg p-3 focus:ring-4 focus:ring-[var(--rm-yellow)] focus:border-[var(--rm-yellow)] outline-none transition"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--rm-blue)] text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Submit Request
          </button>
        </form>

        {/* SUCCESS */}
        {status === "success" && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-semibold">
              Your request has been submitted successfully!
            </p>
            <p className="mt-1">
              Your Support Ticket ID:
              <span className="font-bold ml-2">{ticketId}</span>
            </p>
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
