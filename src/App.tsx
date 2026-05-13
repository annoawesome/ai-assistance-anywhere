import React, { useEffect, useRef } from "react";
import generate from "./generatorPipeline.js";
import ConversationPanel from "./components/ConversationPanel.js";
import {
  Conversation,
  createMessage,
  pushMessageToConversation,
} from "./model/messages.js";

export default function App() {
  const [conversation, setConversation] = React.useState<Conversation>([
    createMessage("User", "Write a poem about machine learning."),
  ]);

  useEffect(() => {
    generate().then((response) => {
      if (!response) return;

      setConversation((prev) =>
        pushMessageToConversation(prev, {
          author: "Assistant",
          content: response.toString(),
        }),
      );
    });
  }, []);

  return (
    <>
      <h1>App</h1>
      <ConversationPanel conversation={conversation} />
    </>
  );
}
