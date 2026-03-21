import { codeToHtml } from "shiki";

import { CopyButton } from "@/components/CopyButton";

export const CodeBlock = async ({
  children,
  ...props
}: React.ComponentProps<"pre">) => {
  // Extract raw code and language from MDX's <pre><code> structure
  const codeElement = children as React.ReactElement<{
    children: string;
    className?: string;
  }>;
  const code = (codeElement?.props?.children ?? "").toString().trimEnd();
  const lang =
    codeElement?.props?.className?.replace("language-", "") ?? "text";

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light-default",
      dark: "github-dark-default",
    },
    defaultColor: false,
  });

  return (
    <div className="group/code relative my-5">
      <div
        className="overflow-x-auto rounded-lg border border-border-subtle bg-surface text-[13px] leading-6 font-mono [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:bg-transparent! [&_code]:grid [&_.line]:border-l-2 [&_.line]:border-transparent [&_.line]:pl-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton code={code} />
    </div>
  );
};
