import { app } from "@azure/functions";
import { generateSASToken } from "../../lib";

app.http("generateSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    const sasToken = await generateSASToken();
    return { body: sasToken };
  },
});
