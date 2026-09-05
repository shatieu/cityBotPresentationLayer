"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Dobrý den! Jsem váš průvodce firmami a službami ve Znojmě. Zeptejte se mě na cokoliv \u2014 třeba \u201ePotřebuji instalatéra\u201C nebo \u201eKde najdu zubaře\u201C.",
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

    // Mock response for now — will connect to Anthropic API later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Díky za dotaz! V tuto chvíli pracuji v demo režimu. V budoucnu vám pomůžu najít firmy a služby ve Znojmě na základě vašeho požadavku: "${text}"`,
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-[500px] max-h-[70vh] bg-surface rounded-base shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-100 bg-white">
        <h3 className="font-heading font-semibold text-ink-900">
          Průvodce firmami
        </h3>
        <p className="text-xs text-stone-500">
          Zeptejte se, co potřebujete
        </p>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-card px-3 py-2 rounded-base">
              <span className="text-sm text-stone-500 animate-pulse">
                Přemýšlím...
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-stone-100 bg-white">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
