"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useContactDialog } from "@/stores/contactDialog";

export const ContactDialog = () => {
  const { isOpen, close } = useContactDialog();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setMessage("");
      setStatus("idle");
      requestAnimationFrame(() => {
        emailRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const handleSubmit = async () => {
    if (!email.trim() || !message.trim() || status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setTimeout(() => close(), 1500);
    } catch {
      setStatus("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={close}
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-[20%] w-full max-w-[480px] -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="overflow-hidden rounded-lg border border-border-subtle bg-background/60 backdrop-blur-xl shadow-lg">
          <div className="border-b border-border-subtle px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-foreground">
                Drop a message
              </span>
              <kbd className="pointer-events-none flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground-tertiary">
                ESC
              </kbd>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-3" onKeyDown={handleKeyDown}>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-md border border-border-subtle bg-transparent px-3 py-2 text-[13px] text-foreground outline-none placeholder:text-foreground-tertiary focus:border-border"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full resize-none rounded-md border border-border-subtle bg-transparent px-3 py-2 text-[13px] text-foreground outline-none placeholder:text-foreground-tertiary focus:border-border"
            />
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                &#8984;
              </kbd>
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                &#8629;
              </kbd>
              <span>send</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={
                !email.trim() ||
                !message.trim() ||
                status === "sending" ||
                status === "sent"
              }
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[12px] font-medium text-foreground-inverse transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {status === "idle" && (
                <>
                  <Send size={12} />
                  Send
                </>
              )}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent!"}
              {status === "error" && "Failed, retry?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
