"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

export const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-border-subtle bg-surface text-foreground-tertiary opacity-0 transition-all duration-150 hover:text-foreground hover:bg-muted group-hover/code:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
};
