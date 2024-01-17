import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

const accountName = process.env.ACCOUNT_NAME as string;
const accountKey = process.env.ACCOUNT_KEY as string;
const containerName = "images";

const sharedKeyCredentials = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredentials
);

const generateSASToken = async () => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const permissions = new BlobSASPermissions();

  permissions.write = true;
  permissions.read = true;
  permissions.create = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions,
      expiresOn: expiryDate,
    },
    sharedKeyCredentials
  ).toString();

  return sasToken;
};

export default generateSASToken;
