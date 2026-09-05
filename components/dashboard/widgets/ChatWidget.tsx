"use client";

import { useState, useRef, useEffect } from "react";
import { WidgetCard } from "../WidgetCard";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Dobrý den! Zeptejte se mě na cokoliv o Znojmě.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(text: string) {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Díky za dotaz! Demo režim \u2014 v budoucnu odpovím na: \u201e${text}\u201c`,
      },
    ]);
    setLoading(false);
  }

  return (
    <WidgetCard
      title="Asistent"
      icon="MessageCircle"
      href="/firmy/chat"
      size="medium"
      accent="gold"
      loading={false}
      className="bg-ink-900/[0.03]"
    >
      <div className="flex flex-col h-[280px]">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2 mb-2"
        >
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="flex justify-start">
              <span className="text-xs text-stone-500 animate-pulse bg-gold-50 px-2.5 py-1 rounded-base">
                Přemýšlím...
              </span>
            </div>
          )}
        </div>
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </WidgetCard>
  );
}
