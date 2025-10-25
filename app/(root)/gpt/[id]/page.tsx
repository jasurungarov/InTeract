"use client";

import Header from "@/components/shared/header";
import { Loader2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import useUser from "@/hooks/useUsers"; 
import Button from '@/components/ui/button'

export default function GPTPage() {
  const { users } = useUser(1); // user ma’lumotlari contextdan, 1 ni kerakli argumentga almashtiring
  const user = users; // Agar users massiv bo'lsa, kerakli userni tanlang
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "I am your AI assistant 🤖"},
    { role: "ai", text: "Send your post, I will beautifully format it or Post's theme" },
  ]);
  const [isloading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "AI couldn't find the answer 😅" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error occurred, try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header isBack label="AI Chat"/>
      {user && (
        <>
        <div className="flex flex-col h-[calc(100dvh-64px)] md:h-[calc(100vh-64px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-green-700 text-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isloading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-2xl text-white">
                  <Loader2 className="animate-spin w-4 h-4" />typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="sticky bottom-0 backdrop-blur-md p-4 flex gap-3 max-sm:gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Message..."
              className="flex-1 bg-custom-xaki p-3 rounded-xl outline-none text-white max-sm:w-full"
            />
            <Button
              onClick={sendMessage}
              disabled={isloading || !input.trim()}
              classNames="rounded-xl"
              label="Send"
            />
          </div>
        </div>
        </>
      )}
    </>
  );
}
