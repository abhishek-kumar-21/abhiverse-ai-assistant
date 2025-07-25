"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronDown, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
// import ResponseUI from "@/components/ResponseUI";
import ResponseUIAdvanced from "@/components/ResponseUIAdvanced";

export default function Home() {
  const scrollRef = useRef(null);
  const [lastScrolledIndex, setLastScrolledIndex] = useState(-1);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error
  } = useChat({ api: "/api/gemini" });

  // Scroll only when a new user message is added
  useEffect(() => {
    const lastIndex = messages.length - 1;
    if (
      messages?.[lastIndex]?.role === "user" &&
      lastIndex !== lastScrolledIndex &&
      scrollRef.current
    ) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setLastScrolledIndex(lastIndex);
    }
  }, [messages, lastScrolledIndex]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const bottomOffset = 190; // pixels from bottom before hiding the icon
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - bottomOffset;
      setShowScrollIcon(!isNearBottom);
    };

    handleScroll(); // Run on message render

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [messages]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col max-w-[92vw] md:max-w-3xl mx-auto my-5">
      <div className="flex-1 pb-50">
        {messages?.length === 0 && (
          <div className="w-full mt-[40vh] mb-4 text-gray-400 items-center justify-center flex flex-col gap-3">
            <div className="text-2xl">👋</div>
            <div>Start a conversation...</div>
          </div>
        )}

        {messages?.map((message, index) => (
          <div
            key={index}
            className={`mb-4 mt-2 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block py-2 rounded-2xl text-sm ${message.role === "user"
                ? "bg-[#f5f5f5] dark:bg-[rgb(47,47,47)] max-w-[80%] text-primary-foreground px-4"
                : "max-w-full text-gray-900 dark:text-gray-100"
                }`}
            >
              <ResponseUIAdvanced content={message.content} useProse={message.role !== "user"} />
            </div>
          </div>
        ))}

        {error && (
          <div className="w-full flex flex-col items-center justify-center text-red-500 mb-4">
            <div>An error occurred.</div>
            <Button
              variant="outline"
              size="sm"
              onClick={reload}
              className="mt-2 hover:bg-primary/10"
            >
              Retry
            </Button>
          </div>
        )}

        {showScrollIcon && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-22 right-1/2 bg-white dark:bg-[#212121] border p-1.5 rounded-full shadow-md transform transition-all duration-300 z-20"
            title="Scroll to bottom"
          >
            <ChevronDown className="h-6 w-6 block md:hidden" />
            <ArrowDown className="h-5 w-5 hidden md:block" />
          </button>
        )}

        {/* Spacer to avoid touching bottom */}
        <div className="h-10" ref={scrollRef}></div>
      </div>


      {/* Input section */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-2 bg-background border-t dark:border-gray-700 z-10"
      >
        <div className="relative w-full py-2">
          <Textarea
            autoFocus
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              const isTouchDevice = window.innerWidth <= 768; // Disable for tablets/phones
              if (!isTouchDevice && e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="pr-24 resize-none rounded-xl px-3 py-2 max-h-[140px]"
            placeholder="Type your message..."
            rows={1}
          />

          {/* Controls inside textarea area */}
          <div className="absolute right-4 bottom-3 flex items-center space-x-2">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 text-primary" />
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={stop}
                  type="button"
                >
                  Abort
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                disabled={input.trim() === ""}
                size="icon"
                className="rounded-full"
              >
                <Send className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </form>

    </div>
  );
}
