import axios from "axios";

const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY;

export async function askDeepInfra(prompt: string) {
  const response = await axios.post(
    "https://api.deepinfra.com/v1/openai/chat/completions",
    {
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200
    },
    {
      headers: {
        "Authorization": `Bearer ${DEEPINFRA_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data.choices?.[0]?.message?.content || "AI не ответил";
}