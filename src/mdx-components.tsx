import { CodeBlock } from "@/components/CodeBlock";

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    pre: (props) => <CodeBlock {...props} />,
    code: ({ children, className, ...props }) => {
      // Code inside a pre (will be handled by CodeBlock)
      if (className?.startsWith("language-")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      // Inline code
      return (
        <code
          {...props}
          className="rounded-md border border-border-subtle bg-surface px-1.5 py-0.5 text-xs font-mono text-foreground"
        >
          {children}
        </code>
      );
    },
  };
}
