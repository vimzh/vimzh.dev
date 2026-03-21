import { CodeBlock } from "@/components/CodeBlock";

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    pre: (props) => <CodeBlock {...props} />,
    code: ({ children, ...props }) => {
      // Inline code (not inside a pre block)
      const isInline = typeof children === "string";
      if (isInline) {
        return (
          <code
            {...props}
            className="rounded-md border border-border-subtle bg-surface px-1.5 py-0.5 text-xs font-mono text-foreground"
          >
            {children}
          </code>
        );
      }
      return <code {...props}>{children}</code>;
    },
  };
}
