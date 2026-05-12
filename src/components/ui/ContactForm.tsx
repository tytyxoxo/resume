"use client";

import { useState } from "react";

interface Props {
  onSubmit?: () => void;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-base-content">{label}</span>
        {hint && <span className="text-xs text-base-content/40">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function ContactForm({ onSubmit }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit?.();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email">
          <div className="input input-bordered flex items-center gap-2 focus-within:input-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-base-content/40 shrink-0">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" placeholder="you@example.com" className="grow bg-transparent outline-none text-sm" />
          </div>
        </Field>

        <Field label="Password" hint="Min 8 chars">
          <div className="input input-bordered flex items-center gap-2 focus-within:input-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-base-content/40 shrink-0">
              <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="••••••••" className="grow bg-transparent outline-none text-sm" />
          </div>
        </Field>
      </div>

      <Field label="Role">
        <select className="select select-bordered w-full focus:select-primary text-sm">
          <option value="" disabled>Select your role…</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Designer</option>
          <option>Product Manager</option>
        </select>
      </Field>

      <Field label="Message" hint="Optional">
        <textarea
          className="textarea textarea-bordered w-full focus:textarea-primary text-sm resize-none"
          placeholder="Tell me about your project…"
          rows={4}
        />
      </Field>

      <button
        type="submit"
        className={`btn w-full ${submitted ? "btn-success" : "btn-primary"}`}
        disabled={submitted}
      >
        {submitted ? <><span className="text-base">✓</span> Sent!</> : "Send Message"}
      </button>
    </form>
  );
}
