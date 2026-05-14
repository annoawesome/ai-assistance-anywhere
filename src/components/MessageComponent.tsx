import Markdown from "markdown-to-jsx";
import React from "react";

export default function MessageComponent({
  author,
  content,
}: {
  author: string;
  content: string;
}) {
  return (
    <div className="message">
      <p className="message-author">{author}</p>
      <Markdown
        className="message-content"
        options={{
          forceWrapper: true,
          ignoreHTMLBlocks: true,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
