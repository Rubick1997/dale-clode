export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const response = await fetch(
    `https://ai-image-generator-app-rustam.azurewebsites.net/api/getimages?timestamp=${new Date().getTime()}`,
    {
      headers: { "Content-Type": "application/json" },
      // to prevent caching

      next: {
        revalidate: 0,
      },
    }
  );
  const textData = await response.blob();

  return new Response(textData, { status: 200 });
}
