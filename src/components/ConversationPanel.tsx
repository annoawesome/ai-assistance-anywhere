import React from "react";
import MessageComponent from "./MessageComponent.js";

export default function ConversationPanel({
  conversation,
}: {
  conversation: { author: string; content: string }[];
}) {
  if (conversation.length === 0) {
    return (
      <div id="conversation-panel">
        I am an AI assistant. How can I help you today? When you are ready, type
        your message in the input box below and press Enter.
      </div>
    );
  }

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
