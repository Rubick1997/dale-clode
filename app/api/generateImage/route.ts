import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = (await request.json()) as { prompt: string };
  const prompt = res.prompt;

  const response = await axios.post(
    "https://ai-image-generator-app-rustam.azurewebsites.net/api/generateimage",
    JSON.stringify({ prompt }),
    {
      headers: { "Content-Type": "application/json" },
      responseType: "text",
      // to prevent caching
      params: {
        _: new Date().getTime(),
      },
    }
  );
  const textData = await response.data;

  return NextResponse.json(textData);
}
