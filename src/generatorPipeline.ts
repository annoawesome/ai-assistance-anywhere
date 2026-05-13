import {
  pipeline,
  TextGenerationPipeline,
  TextStreamer,
} from "@huggingface/transformers";

let generator: TextGenerationPipeline;

const MODEL = "onnx-community/gemma-3-270m-it-ONNX";

export default async function generate() {
  // Create a text generation pipeline
  generator ??= await pipeline("text-generation", MODEL, { dtype: "fp32" });

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Write a poem about machine learning." },
  ];

  // Generate a response
  const output = await generator(messages, {
    max_new_tokens: 512,
    do_sample: false,
    streamer: new TextStreamer(generator.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      // callback_function: (text) => { /* Optional callback function */ },
    }),
  });

  const reply = output[0].generated_text.at(-1)?.content;

  return reply;
}
