"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { CallyDatePicker } from "@/components/CallyDatePicker";
import { useScene } from "@/components/scene/store";
import { bookingSlots, profile } from "@/data/resume";
import { JourneyCard } from "./JourneyCard";

type Status = "idle" | "loading" | "success" | "error";

async function send(body: { name: string; email: string; subject: string; message: string }) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const label = "label-text text-xs text-base-content/70";

export function Contact({ className }: { className: string }) {
  const markSent = useScene((s) => s.markSent);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({ name: "", email: "", date: "", time: "", note: "" });
  const [bookingStatus, setBookingStatus] = useState<Status>("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    if (await send(form)) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      markSent(); // the paper plane on the desk takes off
    } else {
      setStatus("error");
    }
  };

  const onBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus("loading");
    const ok = await send({
      name: booking.name,
      email: booking.email,
      subject: `Consultation Request: ${booking.date} ${booking.time}`,
      message: `Date: ${booking.date}\nTime: ${booking.time}\n\n${booking.note || "No additional notes."}`,
    });
    if (ok) {
      setBookingStatus("success");
      setBooking({ name: "", email: "", date: "", time: "", note: "" });
    } else {
      setBookingStatus("error");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="contact" aria-labelledby="contact-heading" className={className}>
      <JourneyCard id="contact" title="Get in touch" hint="Send a message and watch the paper plane take off">
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-base-content/15 px-3 py-2 text-sm font-medium text-base-content transition-colors duration-200 hover:border-base-content/35"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {profile.email}
          </a>
          <button
            type="button"
            onClick={() => {
              setBookingOpen(true);
              setBookingStatus("idle");
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-base-content/15 px-3 py-2 text-sm font-medium text-base-content transition-colors duration-200 hover:border-base-content/35"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Book a call
          </button>
        </div>

        <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="form-control gap-1">
              <label htmlFor="contact-name" className={label}>Name</label>
              <input id="contact-name" type="text" name="name" placeholder="Your name" className="input input-bordered input-sm w-full" value={form.name} onChange={onChange} maxLength={100} required />
            </div>
            <div className="form-control gap-1">
              <label htmlFor="contact-email" className={label}>Email</label>
              <input id="contact-email" type="email" name="email" placeholder="your@email.com" className="input input-bordered input-sm w-full" value={form.email} onChange={onChange} maxLength={254} required />
            </div>
          </div>
          <div className="form-control gap-1">
            <label htmlFor="contact-subject" className={label}>Subject</label>
            <input id="contact-subject" type="text" name="subject" placeholder="What's this about?" className="input input-bordered input-sm w-full" value={form.subject} onChange={onChange} maxLength={200} required />
          </div>
          <div className="form-control gap-1">
            <label htmlFor="contact-message" className={label}>Message</label>
            <textarea id="contact-message" name="message" placeholder="Tell me about the role or project" className="textarea textarea-bordered textarea-sm h-20 w-full resize-none" value={form.message} onChange={onChange} maxLength={5000} required />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary btn-sm" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            <p aria-live="polite" className="text-sm">
              {status === "success" && <span className="text-success">Message sent. I&apos;ll reply by email.</span>}
              {status === "error" && <span className="text-error">Something went wrong. Please try again, or email me.</span>}
            </p>
          </div>
        </form>

        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-base-content/65">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-base-content">
            LinkedIn
          </a>
        </p>
      </JourneyCard>

      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Book a consultation"
        actions={
          bookingStatus !== "success" ? (
            <button form="booking-form" type="submit" className="btn btn-primary" disabled={bookingStatus === "loading"}>
              {bookingStatus === "loading" ? "Sending…" : "Confirm booking"}
            </button>
          ) : (
            <button className="btn" onClick={() => setBookingOpen(false)}>Close</button>
          )
        }
      >
        {bookingStatus === "success" ? (
          <div className="py-4 text-center">
            <p className="font-semibold text-base-content">Booking request sent</p>
            <p className="mt-1 text-sm text-base-content/70">I&apos;ll confirm your slot by email.</p>
          </div>
        ) : (
          <form id="booking-form" className="mt-2 flex flex-col gap-3" onSubmit={onBookingSubmit}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="form-control gap-1">
                <label htmlFor="booking-name" className={label}>Name</label>
                <input id="booking-name" type="text" name="name" placeholder="Your name" className="input input-bordered input-sm w-full" value={booking.name} onChange={onBookingChange} maxLength={100} required />
              </div>
              <div className="form-control gap-1">
                <label htmlFor="booking-email" className={label}>Email</label>
                <input id="booking-email" type="email" name="email" placeholder="your@email.com" className="input input-bordered input-sm w-full" value={booking.email} onChange={onBookingChange} maxLength={254} required />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="form-control gap-1">
                <span className={label}>Date</span>
                <CallyDatePicker name="date" value={booking.date} onChange={(val) => setBooking((prev) => ({ ...prev, date: val }))} min={today} required />
              </div>
              <div className="form-control gap-1">
                <label htmlFor="booking-time" className={label}>Time slot (Bangkok)</label>
                <select id="booking-time" name="time" className="select select-sm w-full" value={booking.time} onChange={onBookingChange} required>
                  <option value="" disabled>Select a time</option>
                  {bookingSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control gap-1">
              <label htmlFor="booking-note" className={label}>Note (optional)</label>
              <textarea id="booking-note" name="note" placeholder="What would you like to discuss?" className="textarea textarea-bordered textarea-sm h-20 w-full resize-none" value={booking.note} onChange={onBookingChange} maxLength={1000} />
            </div>
            {bookingStatus === "error" && <p className="text-sm text-error">Something went wrong. Please try again.</p>}
          </form>
        )}
      </Modal>
    </section>
  );
}
