
import { spawn } from "child_process";

export async function runLocalLLMSummary(content: string): Promise<string> {
  const prompt = `<|user|>\nGive a short summary of this article: ${content} \n<|assistant|>`;
  const binaryPath = "../llama-engine/llama.cpp/build/bin/llama-cli";
  const modelPath = "../llama-engine/llama.cpp/models/gemma/tinyllama-chat.gguf";

  return new Promise((resolve, reject) => {
    const llm = spawn(binaryPath, [
  "-m", modelPath,
  "-p", prompt,
  "--n-predict", "300",
  "--temp", "0.7",
]);


    let fullOutput = "";
    let resolved = false;

    const timeout = setTimeout(() => {
      if (!resolved) {
        console.log("⏰ Timeout: killing LLM process...");
        llm.kill("SIGINT");
        if (fullOutput.includes("<|assistant|>")) {
          const match = fullOutput.match(/<\|assistant\|>\s*([\s\S]*)/);
          console.log("📄 Timeout Output:", match?.[1]);
          resolved = true;
          return resolve((match?.[1] || fullOutput).trim());
        }
        reject(new Error("LLM process timed out"));
      }
    }, 35000);

    llm.stdout.on("data", (data) => {
      const text = data.toString();
      fullOutput += text;
      process.stdout.write("🟢");

      const assistantOut = fullOutput.match(/<\|assistant\|>\s*([\s\S]*)/);
      if (assistantOut && assistantOut[1].length > 800 && !resolved) {
        resolved = true;
        clearTimeout(timeout);
        console.log("\n✅ Early termination — sufficient output received");
        llm.kill("SIGINT");
        return resolve(assistantOut[1].trim());
      }
    });

    llm.stderr.on("data", (data) => {
      console.error("🔴 STDERR:", data.toString());
    });

    llm.on("close", (code) => {
      clearTimeout(timeout);
      if (!resolved) {
        const match = fullOutput.match(/<\|assistant\|>\s*([\s\S]*)/);
        if (match && match[1].length > 20) {
          resolved = true;
          return resolve(match[1].trim());
        } else {
          return reject(new Error("LLM closed with insufficient output"));
        }
      }
    });

    llm.on("error", (err) => {
      clearTimeout(timeout);
      if (!resolved) {
        reject(err);
      }
    });
  });
}


