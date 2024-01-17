export const dynamic = "force-dynamic";

export async function GET() {
  //connect to microsoft azure

  const response = await fetch(
    `https://ai-image-generator-app-rustam.azurewebsites.net/api/getchatgptsuggestion?timestamp=${new Date().getTime()}`,
    {
      headers: { "Content-Type": "application/json" },
      // to prevent caching

      next: {
        revalidate: 0,
      },
    }
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
