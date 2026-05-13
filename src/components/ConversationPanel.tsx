import React from "react";
import MessageComponent from "./MessageComponent.js";

export default function ConversationPanel({
  conversation,
}: {
  conversation: { author: string; content: string }[];
}) {
  return (
    <div id="conversation-panel">
      {conversation.map((message, index) => (
        <MessageComponent
          key={index}
          author={message.author}
          content={message.content}
        />
      ))}
    </div>
  );
}
