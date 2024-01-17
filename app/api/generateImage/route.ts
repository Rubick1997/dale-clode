import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const res = (await request.json()) as { prompt: string };
  const prompt = res.prompt;

  const response = await fetch(
    `https://ai-image-generator-app-rustam.azurewebsites.net/api/generateimage?timestamp=${new Date().getTime()}`,
    {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
      // to prevent caching

      next: {
        revalidate: 0,
      },
    }
  );
  const textData = await response.text();

  return NextResponse.json(textData);
}
