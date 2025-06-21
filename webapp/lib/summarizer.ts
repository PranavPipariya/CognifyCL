import { ChatModule } from "@mlc-ai/web-llm";

let chat: ChatModule | null = null;

export async function initWebLLM() {
  if (chat) return chat;

  chat = new ChatModule();
  await chat.reload("TinyLlama-1.1B-Chat.Q4_K_M", {
    modelUrl: "/models/TinyLlama-1.1B-Chat.Q4_K_M.gguf"
  });

  return chat;
}

export async function getSummaryAndLinks(input: string): Promise<string> {
  const chat = await initWebLLM();

  const prompt = `
  Summarize this article and provide a short list of similar high-quality resources (with titles and brief descriptions):

  ARTICLE:
  ${input}
  `;

  await chat.resetChat();
  const reply = await chat.chat(prompt);

  return reply;
}
