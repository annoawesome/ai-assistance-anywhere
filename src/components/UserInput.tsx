import React from "react";
import {
  Conversation,
  createMessage,
  pushMessageToConversation,
} from "../model/messages.js";
import generate from "../generatorPipeline.js";

function onKeyDown(
  event: React.KeyboardEvent<HTMLInputElement>,
  conversation: Conversation,
  setConversation: React.Dispatch<React.SetStateAction<Conversation>>,
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const userInput = event.currentTarget.value;

  if (event.key !== "Enter") return;
  if (!userInput.trim()) return;

  event.currentTarget.value = "";

  // TODO: Handle the user input, e.g., by sending it to the backend or updating the conversation state
  const mutatedConversation = pushMessageToConversation(
    conversation,
    createMessage("User", userInput),
  );

  setConversation(mutatedConversation);
  setIsGenerating(true);

  // We want to wait a bit so that the user can see their message before the assistant starts responding
  setTimeout(() => {
    generate(mutatedConversation)
      .then((response) => {
        if (!response) return;

        setConversation(
          pushMessageToConversation(mutatedConversation, {
            author: "Assistant",
            content: response.toString(),
          }),
        );
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, 500);
}

export default function UserInput({
  conversation,
  setConversation,
}: {
  conversation: Conversation;
  setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
}) {
  const [isGenerating, setIsGenerating] = React.useState(false);

  return (
    <input
      type="text"
      placeholder={
        isGenerating
          ? "AI Assistant is responding..."
          : "Type your message here..."
      }
      id="user-input"
      disabled={isGenerating}
      onKeyDown={(event) =>
        onKeyDown(event, conversation, setConversation, setIsGenerating)
      }
    />
  );
}
