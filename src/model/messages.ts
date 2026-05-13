export interface Message {
  author: string;
  content: string;
}

export type Conversation = Message[];

export function createMessage(author: string, content: string): Message {
  return { author, content };
}

/**
 * Pushes a message to a conversation. Really nice for React state updates.
 * @param conversation - The conversation to push the message to.
 * @param message - The message to push.
 * @returns A new conversation with the message added.
 */
export function pushMessageToConversation(
  conversation: Conversation,
  message: Message,
): Conversation {
  return [...conversation, message];
}
