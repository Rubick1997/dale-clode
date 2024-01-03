import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORGANIZATION,
});

export default openai;
