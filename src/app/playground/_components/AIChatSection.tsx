"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "./Section";

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

export function AIChatSection() {
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
    <Section title="Ask AI about me">
      <div className="w-full max-w-2xl flex flex-col gap-3">
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
  );
}
