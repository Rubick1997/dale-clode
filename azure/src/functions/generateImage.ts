import { app } from "@azure/functions";
import openai from "../../lib/openai";
import axios from "axios";
import { generateSASToken } from "../../lib";
import { BlobServiceClient } from "@azure/storage-blob";

const accountName = process.env.ACCOUNT_NAME;
const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = (await request.json()) as { prompt: string };
    console.log("prompt", prompt);
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url as string;
    const res = await axios.get(image_url, { responseType: "arraybuffer" });
    const arrayBuffer = res.data;
    const sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("upload success");
      return { status: 200, body: "Image was uploaded successfully" };
    } catch (error) {
      const { message } = error as Error;
      console.error("Error uploading blob", message);
      return { status: 500, body: message };
    }
  },
});
