import 'dotenv/config';
import { Request, Response } from 'express';
import { buildAIAssistantPrompt } from '../utils/aiPromptBuilder';
import { askDeepInfra } from '../services/assistantService';


export const askAssistant = async (req: Request, res: Response) => {
  try {
    const prompt = buildAIAssistantPrompt(req.body);
    const answer = await askDeepInfra(prompt);
    res.json({ answer })
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "AI error", details: errorMessage });
  }
}