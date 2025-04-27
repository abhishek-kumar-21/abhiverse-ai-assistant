// Not in use :- supports copy button as well but does not parse markdown table to html table
import React, { useEffect, useState } from "react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { unified } from "unified";

const ResponseUI2 = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState("");

  // Reprocess markdown whenever "content" changes
  useEffect(() => {
    async function processMarkdown() {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: "Response" })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
          theme: "github-dark",
          transformers: [
            transformerCopyButton({
              visibility: "hover",
              feedbackDuration: 3000,
            }),
          ],
        });

      const file = await processor.process(content);
      setHtmlContent(String(file));
    }

    if (content) {
      processMarkdown();
    }
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="prose dark:prose-invert max-w-full"
    ></div>
  );
};

export default ResponseUI2;
