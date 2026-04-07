"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Modal } from "@/components/Modal";
import { CallyDatePicker } from "@/components/CallyDatePicker";

const TIME_SLOTS = [
  "09:00 – 10:00",
  "10:00 – 11:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "16:00 – 17:00",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({ name: "", email: "", date: "", time: "", note: "" });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        subject: `Consultation Request: ${booking.date} ${booking.time}`,
        message: `Date: ${booking.date}\nTime: ${booking.time}\n\n${booking.note || "No additional notes."}`,
      }),
    });

    if (res.ok) {
      setBookingStatus("success");
      setBooking({ name: "", email: "", date: "", time: "", note: "" });
    } else {
      setBookingStatus("error");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-base-100 min-h-full flex flex-col bg-dot-pattern">

      {/* Form section */}
      <div className="max-w-2xl mx-auto px-6 py-20 w-full flex-1">
        <Reveal>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-4xl font-bold text-base-content mb-2">Contact</h1>
          <p className="text-base-content/50 mb-12">Have a project in mind? Let&apos;s talk.</p>
        </Reveal>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="form-control gap-1">
              <label className="label-text text-sm text-base-content/60">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
                className="input input-bordered w-full"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="form-control gap-1">
              <label className="label-text text-sm text-base-content/60">Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                className="textarea textarea-bordered w-full h-36 resize-none"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
          </Reveal>
          <Reveal delay={400}>
            {status === "success" && (
              <p className="text-success text-sm mb-2">Message sent! I&apos;ll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-error text-sm mb-2">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-fit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message →"}
            </button>
          </Reveal>
        </form>
      </div>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-content py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Let&apos;s build something<br />remarkable together.
            </h2>
            <p className="text-primary-content/70 mb-10 text-lg">
              Currently taking on select projects. Whether you have a specific idea or just want to chat, my inbox is always open.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:tyty.passon@gmail.com"
                className="btn bg-white text-primary border-none hover:bg-white/90 gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                tyty.passon@gmail.com
              </a>
              <button
                type="button"
                onClick={() => { setBookingOpen(true); setBookingStatus("idle"); }}
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                </svg>
                Book a Consultation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Book a Consultation"
        actions={
          bookingStatus !== "success" ? (
            <button
              form="booking-form"
              type="submit"
              className="btn btn-primary"
              disabled={bookingStatus === "loading"}
            >
              {bookingStatus === "loading" ? "Sending..." : "Confirm Booking"}
            </button>
          ) : (
            <button className="btn" onClick={() => setBookingOpen(false)}>Close</button>
          )
        }
      >
        {bookingStatus === "success" ? (
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-success mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="font-semibold text-base-content">Booking request sent!</p>
            <p className="text-sm text-base-content/60 mt-1">I&apos;ll confirm your slot via email shortly.</p>
          </div>
        ) : (
          <form id="booking-form" className="flex flex-col gap-3 mt-2" onSubmit={handleBookingSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="input input-bordered input-sm w-full"
                  value={booking.name}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input input-bordered input-sm w-full"
                  value={booking.email}
                  onChange={handleBookingChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Date</label>
                <CallyDatePicker
                  name="date"
                  value={booking.date}
                  onChange={(val) => setBooking((prev) => ({ ...prev, date: val }))}
                  min={today}
                  required
                />
              </div>
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Time Slot</label>
                <select
                  name="time"
                  className="select select-sm w-full"
                  value={booking.time}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="" disabled>Select a time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control gap-1">
              <label className="label-text text-sm text-base-content/60">Note (optional)</label>
              <textarea
                name="note"
                placeholder="What would you like to discuss?"
                className="textarea textarea-bordered textarea-sm w-full h-20 resize-none"
                value={booking.note}
                onChange={handleBookingChange}
              />
            </div>
            {bookingStatus === "error" && (
              <p className="text-error text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </Modal>

    </div>
  );
}
