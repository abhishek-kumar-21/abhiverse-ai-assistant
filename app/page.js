"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import ResponseUI from "@/components/ResponseUI";

export default function Home() {
  const scrollRef = useRef(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen max-w-[92vw] md:max-w-3xl mx-auto my-5">
      <div className="flex-1">
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
              className={`inline-block px-4 py-2 rounded-2xl text-sm ${message.role === "user"
                  ? "bg-[#f5f5f5] dark:bg-[rgb(47,47,47)] max-w-[80%] text-primary-foreground"
                  : "max-w-full text-gray-900 dark:text-gray-100"
                }`}
            >
              <ResponseUI content={message.content} />
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

        {/* Spacer to avoid touching bottom */}
        <div className="h-10" ref={scrollRef}></div>
      </div>


      {/* Input section */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full p-2 border-t dark:border-gray-700"
      >
        <div className="relative w-full">
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="pr-24 resize-none rounded-xl px-3 py-2 max-h-[140px]"
            placeholder="Type your message..."
            rows={1}
          />

          {/* Controls inside textarea area */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-2">
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
