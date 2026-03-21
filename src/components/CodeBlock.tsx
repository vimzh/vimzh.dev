"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export const CodeBlock = ({
  children,
  ...props
}: React.ComponentProps<"pre">) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(() => {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group/code relative">
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto rounded-lg border border-border-subtle bg-surface px-4 py-3.5 text-xs leading-relaxed font-mono"
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-border-subtle bg-surface text-foreground-tertiary opacity-0 transition-all duration-150 hover:text-foreground hover:bg-muted group-hover/code:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
    </div>
  );
};
