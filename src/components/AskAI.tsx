"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "ai"; text: string };

const SUGGESTED = [
  "What stack do you use?",
  "Tell me about your experience",
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

export function AskAI() {
  const [open, setOpen] = useState(false);
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
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[9997] w-80 sm:w-96 bg-base-100 border border-base-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-content">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-content/60 animate-pulse" />
              <span className="font-semibold text-sm">Ask AI about Passon</span>
            </div>
            <button
              className="btn btn-ghost btn-xs text-primary-content hover:bg-primary-content/10"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 p-3 h-64 overflow-y-auto bg-base-200/50">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2 my-auto">
                <p className="text-base-content/40 text-xs text-center mb-2">
                  Ask anything about Passon
                </p>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    className="btn btn-sm btn-outline btn-primary rounded-full text-xs"
                    onClick={() => send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat ${m.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble text-xs leading-relaxed ${m.role === "user" ? "chat-bubble-primary" : ""}`}
                >
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
          <div className="flex gap-2 p-3 border-t border-base-300">
            <input
              type="text"
              className="input input-bordered input-sm flex-1 text-sm"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              disabled={loading}
              autoFocus
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-[9997] w-10 h-10 rounded-full bg-primary text-primary-content shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-transform duration-200 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask AI"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center">
          <span className="absolute w-4 h-4 rounded-full bg-success opacity-75 animate-ping" style={{ animationDuration: "2s" }} />
          <span className="relative w-3 h-3 rounded-full bg-success border-2 border-base-100" />
        </span>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
