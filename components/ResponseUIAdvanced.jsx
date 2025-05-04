// Enhanced version of ResponseUI by addition of "custom copy button" for code blocks.
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Check, Copy } from "lucide-react";
import "highlight.js/styles/atom-one-dark.css";

const CodeBlock = ({ children, className }) => {
  const codeRef = React.useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      {/* Show button only if className exists (i.e., language is defined) */}
      {className && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 text-blue-400 dark:text-blue-300"
          title="Copy"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      )}
      <pre>
        <code ref={codeRef} className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const ResponseUIAdvanced = ({ content, useProse = true }) => {
  return useProse ? (
    <div className="prose dark:prose-invert max-w-full">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline || !className) {
              return (
                <kbd className={className} {...props}>
                  {children}
                </kbd>
              );
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },
        }}
      />
    </div>
  ) : (
    <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 text-base">{content}</div>
  );
};

export default ResponseUIAdvanced;
