"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/Modal";

type Message = { role: "user" | "ai"; text: string };

const SUGGESTED = [
  "What stack do you use?",
  "Tell me about your experience",
  "What are you learning now?",
  "Are you open to work?",
];

async function askAI(question: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await res.json();
  return data.text ?? "Sorry, I couldn't get a response.";
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-base-content/40 uppercase tracking-widest mb-4 border-b border-base-300 pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-3 items-start">{children}</div>
    </section>
  );
}

export default function Playground() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [progress] = useState(70);
  const [rating, setRating] = useState(3);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    const reply = await askAI(text);
    setMessages((m) => [...m, { role: "ai", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="bg-base-100 min-h-full bg-dot-pattern">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col gap-14">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-1">
            Playground
          </h1>
          <p className="text-base-content/50">daisyUI component showcase</p>
        </div>

        {/* AI CHAT */}
        <Section title="Ask AI about me">
          <div className="w-full max-w-2xl flex flex-col gap-3">
            {/* Suggested questions */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  className="btn btn-sm btn-outline btn-primary rounded-full"
                  onClick={() => send(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat messages */}
            <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-3 min-h-40 max-h-96 overflow-y-auto">
              {messages.length === 0 && (
                <p className="text-base-content/30 text-sm text-center my-auto">
                  Ask anything about Passon ↑
                </p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`chat ${m.role === "user" ? "chat-end" : "chat-start"}`}>
                  <div className={`chat-bubble text-sm ${m.role === "user" ? "chat-bubble-primary" : ""}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="chat chat-start">
                  <div className="chat-bubble">
                    <span className="loading loading-dots loading-xs" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered flex-1"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                disabled={loading}
              />
              <button
                className="btn btn-primary"
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </Section>

        {/* ACTIONS */}
        <Section title="Button">
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
          <button className="btn btn-outline btn-primary">Outline</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
          <button className="btn btn-xs">xs</button>
          <button className="btn btn-sm">sm</button>
          <button className="btn btn-md">md</button>
          <button className="btn btn-lg">lg</button>
          <button className="btn btn-wide">Wide</button>
          <button className="btn btn-circle">●</button>
          <button className="btn btn-disabled" disabled>
            Disabled
          </button>
        </Section>

        {/* BADGE */}
        <Section title="Badge">
          <span className="badge">Default</span>
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-accent">Accent</span>
          <span className="badge badge-neutral">Neutral</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-error">Error</span>
          <span className="badge badge-outline">Outline</span>
          <span className="badge badge-xs">xs</span>
          <span className="badge badge-sm">sm</span>
          <span className="badge badge-md">md</span>
          <span className="badge badge-lg">lg</span>
        </Section>

        {/* ALERT */}
        <Section title="Alert">
          <div className="alert w-full max-w-md">
            <span>Default alert</span>
          </div>
          <div className="alert alert-info w-full max-w-md">
            <span>Info alert</span>
          </div>
          <div className="alert alert-success w-full max-w-md">
            <span>Success alert</span>
          </div>
          <div className="alert alert-warning w-full max-w-md">
            <span>Warning alert</span>
          </div>
          <div className="alert alert-error w-full max-w-md">
            <span>Error alert</span>
          </div>
        </Section>

        {/* CARD */}
        <Section title="Card">
          <div className="card bg-base-200 shadow w-56">
            <div className="card-body">
              <h3 className="card-title text-base">Card Title</h3>
              <p className="text-sm text-base-content/60">
                Card description here.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Action</button>
              </div>
            </div>
          </div>
          <div className="card bg-primary text-primary-content shadow w-56">
            <div className="card-body">
              <h3 className="card-title text-base">Primary Card</h3>
              <p className="text-sm opacity-80">Colored card example.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm">Action</button>
              </div>
            </div>
          </div>
          <div className="card card-bordered w-56">
            <div className="card-body">
              <h3 className="card-title text-base">Bordered Card</h3>
              <p className="text-sm text-base-content/60">With border style.</p>
            </div>
          </div>
        </Section>

        {/* AVATAR */}
        <Section title="Avatar">
          <div className="avatar">
            <div className="w-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold">
              A
            </div>
          </div>
          <div className="avatar">
            <div className="w-16 rounded-lg bg-secondary flex items-center justify-center text-secondary-content text-xl font-bold">
              B
            </div>
          </div>
          <div className="avatar avatar-online">
            <div className="w-16 rounded-full bg-accent flex items-center justify-center text-accent-content text-xl font-bold">
              C
            </div>
          </div>
          <div className="avatar avatar-offline">
            <div className="w-16 rounded-full bg-neutral flex items-center justify-center text-neutral-content text-xl font-bold">
              D
            </div>
          </div>
          <div className="avatar-group -space-x-4">
            {["bg-primary", "bg-secondary", "bg-accent"].map((c, i) => (
              <div key={i} className="avatar">
                <div
                  className={`w-10 rounded-full ${c} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* STAT */}
        <Section title="Stats">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">31K</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            <div className="stat">
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </Section>

        {/* TABLE */}
        <Section title="Table">
          <div className="overflow-x-auto w-full max-w-lg">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Alice", "Designer", "success"],
                  ["Bob", "Developer", "warning"],
                  ["Carol", "Manager", "error"],
                ].map(([name, role, color], i) => (
                  <tr key={i} className="hover">
                    <td>{i + 1}</td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>
                      <span className={`badge badge-${color} badge-sm`}>
                        {color}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* FORM INPUTS */}
        <Section title="Input">
          <input
            type="text"
            placeholder="Default"
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Primary"
            className="input input-primary"
          />
          <input
            type="text"
            placeholder="Secondary"
            className="input input-secondary"
          />
          <input
            type="text"
            placeholder="Accent"
            className="input input-accent"
          />
          <input
            type="text"
            placeholder="Error"
            className="input input-error"
          />
          <input
            type="text"
            placeholder="xs"
            className="input input-bordered input-xs"
          />
          <input
            type="text"
            placeholder="sm"
            className="input input-bordered input-sm"
          />
          <input
            type="text"
            placeholder="lg"
            className="input input-bordered input-lg"
          />
        </Section>

        <Section title="Select">
          <select className="select select-bordered">
            <option>Default</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <select className="select select-primary">
            <option>Primary</option>
            <option>Option 1</option>
          </select>
          <select className="select select-bordered select-sm">
            <option>Small</option>
          </select>
          <select className="select select-bordered select-lg">
            <option>Large</option>
          </select>
        </Section>

        <Section title="Checkbox / Radio / Toggle">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <span className="text-base-content">Checkbox</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              defaultChecked
            />
            <span className="text-base-content">Checked</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" className="radio radio-primary" name="r" />
            <span className="text-base-content">Radio A</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              className="radio radio-primary"
              name="r"
              defaultChecked
            />
            <span className="text-base-content">Radio B</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={toggled}
              onChange={() => setToggled(!toggled)}
            />
            <span className="text-base-content">
              Toggle {toggled ? "ON" : "OFF"}
            </span>
          </label>
        </Section>

        {/* RANGE / RATING */}
        <Section title="Range / Rating">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              className="range range-primary"
              readOnly
            />
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={40}
              className="range range-secondary"
            />
          </div>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <input
                key={n}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-warning"
                checked={rating === n}
                onChange={() => setRating(n)}
              />
            ))}
          </div>
        </Section>

        {/* PROGRESS */}
        <Section title="Progress">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <progress
              className="progress progress-primary w-full"
              value={70}
              max={100}
            />
            <progress
              className="progress progress-secondary w-full"
              value={50}
              max={100}
            />
            <progress
              className="progress progress-accent w-full"
              value={30}
              max={100}
            />
            <progress
              className="progress progress-success w-full"
              value={90}
              max={100}
            />
            <progress className="progress w-full" />
          </div>
        </Section>

        {/* LOADING */}
        <Section title="Loading">
          <span className="loading loading-spinner loading-xs" />
          <span className="loading loading-spinner loading-sm" />
          <span className="loading loading-spinner loading-md" />
          <span className="loading loading-spinner loading-lg" />
          <span className="loading loading-dots loading-md" />
          <span className="loading loading-ring loading-md" />
          <span className="loading loading-ball loading-md" />
          <span className="loading loading-bars loading-md" />
          <span className="loading loading-infinity loading-md" />
        </Section>

        {/* TOOLTIP */}
        <Section title="Tooltip">
          <div className="tooltip" data-tip="Default tooltip">
            <button className="btn btn-sm">Hover me</button>
          </div>
          <div className="tooltip tooltip-primary" data-tip="Primary">
            <button className="btn btn-sm btn-primary">Primary</button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Top">
            <button className="btn btn-sm">Top</button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Bottom">
            <button className="btn btn-sm">Bottom</button>
          </div>
          <div className="tooltip tooltip-left" data-tip="Left">
            <button className="btn btn-sm">Left</button>
          </div>
          <div className="tooltip tooltip-right" data-tip="Right">
            <button className="btn btn-sm">Right</button>
          </div>
        </Section>

        {/* KBD */}
        <Section title="Kbd">
          <kbd className="kbd">A</kbd>
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd kbd-sm">Ctrl</kbd>
          <kbd className="kbd kbd-sm">+</kbd>
          <kbd className="kbd kbd-sm">C</kbd>
          <kbd className="kbd kbd-lg">Enter</kbd>
        </Section>

        {/* SKELETON */}
        <Section title="Skeleton">
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="flex items-center gap-3">
              <div className="skeleton w-12 h-12 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-2/3" />
              </div>
            </div>
          </div>
        </Section>

        {/* DIVIDER */}
        <Section title="Divider">
          <div className="w-full max-w-xs flex flex-col">
            <div className="divider">Default</div>
            <div className="divider divider-primary">Primary</div>
            <div className="divider divider-neutral">Neutral</div>
          </div>
          <div className="flex h-20 gap-2 items-center">
            <span className="text-sm">Left</span>
            <div className="divider divider-horizontal">OR</div>
            <span className="text-sm">Right</span>
          </div>
        </Section>

        {/* COLLAPSE / ACCORDION */}
        <Section title="Accordion">
          <div className="w-full max-w-md flex flex-col gap-1">
            {["What is daisyUI?", "Is it free?", "How to install?"].map(
              (q, i) => (
                <div key={i} className="collapse collapse-arrow bg-base-200">
                  <input
                    type="radio"
                    name="accordion"
                    defaultChecked={i === 0}
                  />
                  <div className="collapse-title font-medium">{q}</div>
                  <div className="collapse-content text-sm text-base-content/70">
                    <p>Answer for &quot;{q}&quot; goes here.</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Section>

        {/* STEPS */}
        <Section title="Steps">
          <ul className="steps steps-horizontal">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Profile</li>
            <li className="step">Settings</li>
            <li className="step">Done</li>
          </ul>
        </Section>

        {/* TABS */}
        <Section title="Tabs">
          <div className="tabs tabs-bordered">
            <a className="tab tab-active">Tab 1</a>
            <a className="tab">Tab 2</a>
            <a className="tab">Tab 3</a>
          </div>
          <div className="tabs tabs-lifted">
            <a className="tab tab-active">Tab 1</a>
            <a className="tab">Tab 2</a>
            <a className="tab">Tab 3</a>
          </div>
          <div className="tabs tabs-boxed">
            <a className="tab tab-active">Tab 1</a>
            <a className="tab">Tab 2</a>
            <a className="tab">Tab 3</a>
          </div>
        </Section>

        {/* CHAT BUBBLE */}
        <Section title="Chat">
          <div className="w-full max-w-sm flex flex-col gap-2">
            <div className="chat chat-start">
              <div className="chat-bubble">Hello!</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary">Hi there!</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">
                How are you?
              </div>
            </div>
          </div>
        </Section>

        {/* MODAL */}
        <Section title="Modal">
          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal Title"
            actions={
              <>
                <button className="btn" onClick={() => setModalOpen(false)}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setModalOpen(false)}
                >
                  Confirm
                </button>
              </>
            }
          >
            <p className="py-4">This is a daisyUI modal example.</p>
          </Modal>
        </Section>

        {/* TYPOGRAPHY */}
        <Section title="Typography">
          <div className="flex flex-col gap-1 w-full">
            {(
              [
                "text-5xl",
                "text-4xl",
                "text-3xl",
                "text-2xl",
                "text-xl",
                "text-lg",
                "text-base",
                "text-sm",
                "text-xs",
              ] as const
            ).map((size) => (
              <p
                key={size}
                className={`${size} font-semibold text-base-content`}
              >
                {size} — The quick brown fox
              </p>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
