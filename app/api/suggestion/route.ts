import axios from "axios";

export async function GET() {
  //connect to microsoft azure

  const response = await axios.get(
    "http://localhost:7071/api/getChatGptSuggestion",
    {
      responseType: "text",
      params: {
        _: new Date().getTime(),
      },
    }
  );

  const textData = await response.data;

  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
