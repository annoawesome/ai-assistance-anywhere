import {
  pipeline,
  TextGenerationPipeline,
  TextStreamer,
} from "@huggingface/transformers";
import { Conversation } from "../model/messages.js";

let generator: TextGenerationPipeline;

const MODEL = "onnx-community/gemma-3-270m-it-ONNX";

function convertConversationToMessages(conversation: Conversation) {
  return conversation.map((message) => ({
    role: message.author === "User" ? "user" : "assistant",
    content: message.content,
  }));
}

export async function createPipeline() {
  // Do not create a new pipeline if one already exists
  generator ??= await pipeline("text-generation", MODEL, { dtype: "fp32" });

  return generator;
}

export default async function generate(conversation: Conversation) {
  // Create a text generation pipeline
  const pipeline = await createPipeline();

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...convertConversationToMessages(conversation),
  ];

  // Generate a response
  const output = await pipeline(messages, {
    max_new_tokens: 2048,
    do_sample: false,
    streamer: new TextStreamer(pipeline.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      // callback_function: (text) => { /* Optional callback function */ },
    }),
  });

  const reply = output[0].generated_text.at(-1)?.content;

  return reply;
}
