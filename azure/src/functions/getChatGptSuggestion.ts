import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { openai } from "../../lib";

export async function getChatGptSuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const res = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            'Write a cool prompt for DALL-E to generate an image from. For example, "something magical and beautiful."',
        },
      ],
      max_tokens: 100,
      temperature: 0.8,
    })
    .then((res) => res.choices[0].message.content)
    .catch((err) => `Chat Gpt was unable to respond (Error: ${err.message})`);

  return { body: res };
}

app.http("getChatGptSuggestion", {
  methods: ["GET", "POST"],
  // to allow anyone who is using website to  call this function
  authLevel: "anonymous",
  handler: getChatGptSuggestion,
});
