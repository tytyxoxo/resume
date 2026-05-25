import { Section } from "./Section";

const MESSAGES = [
  { side: "start", name: "Alice", avatar: "A", text: "Hey! Did you finish the design review?", time: "10:14 AM" },
  { side: "end",   name: "You",   avatar: "Y", text: "Almost! Just wrapping up the typography section.", time: "10:15 AM" },
  { side: "start", name: "Alice", avatar: "A", text: "Looks great so far 🎉", time: "10:15 AM" },
  { side: "end",   name: "You",   avatar: "Y", text: "Thanks, will send the link shortly.", time: "10:16 AM" },
] as const;

export function ChatSection() {
  return (
    <Section title="Chat">
      <div className="flex flex-col gap-1 w-full">
        {MESSAGES.map((msg, i) => (
          <div key={i} className={`chat chat-${msg.side}`}>
            <div className="chat-image avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8 text-xs flex items-center justify-center">
                <span>{msg.avatar}</span>
              </div>
            </div>
            <div className="chat-header text-xs text-base-content/50 mb-0.5">
              {msg.name}
            </div>
            <div className="chat-bubble chat-bubble-sm text-sm">{msg.text}</div>
            <div className="chat-footer text-xs text-base-content/40 mt-0.5">{msg.time}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
