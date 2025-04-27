import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';

const ResponseUI = ({content}) => {
  return (
    <div className="prose dark:prose-invert max-w-full">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        />
      </div>
  )
}

export default ResponseUI
