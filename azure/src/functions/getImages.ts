import { app } from "@azure/functions";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { generateSASToken } from "../../lib";
import { textHelpers } from "../../helpers";

const accountName = process.env.ACCOUNT_NAME as string;
const accountKey = process.env.ACCOUNT_KEY as string;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const imageUrls = [] as { url: string; name: string }[];
    const sasToken = await generateSASToken();
    for await (const blob of containerClient.listBlobsFlat()) {
      const imageUrl = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${imageUrl}`;
      imageUrls.push({ url, name: blob.name });
    }
    const sortedImageUrls = imageUrls.sort((a, b) => {
      const aName = textHelpers.getDateFromImgName(a.name);
      const bName = textHelpers.getDateFromImgName(b.name);
      return bName - aName;
    });
    return { jsonBody: { imageUrls: sortedImageUrls } };
  },
});
