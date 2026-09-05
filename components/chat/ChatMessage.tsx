interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 rounded-base text-sm ${
          role === "user"
            ? "bg-gold-700 text-white"
            : "bg-white shadow-card text-ink-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
