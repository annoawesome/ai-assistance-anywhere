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
      <p className="message-content">{content}</p>
    </div>
  );
}
