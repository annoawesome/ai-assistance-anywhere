import React from "react";
import ConversationPanel from "./components/ConversationPanel.js";
import { Conversation } from "./model/messages.js";
import UserInput from "./components/UserInput.js";

export default function App() {
  const [conversation, setConversation] = React.useState<Conversation>([]);

  return (
    <>
      <h1>AI Assistance Anywhere</h1>
      <ConversationPanel conversation={conversation} />
      <UserInput
        conversation={conversation}
        setConversation={setConversation}
      />
    </>
  );
}
