import axios from "axios";
import { blob } from "stream/consumers";

export async function GET(req: Request) {
  const response = await axios.get("http://localhost:7071/api/getImages", {
    responseType: "blob",
    params: {
      _: new Date().getTime(),
    },
  });
  const textData = await response.data;
  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), { status: 200 });
}
