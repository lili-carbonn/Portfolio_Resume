import { getPayload as payloadClient } from "payload";
import config from "../../../payload.config.js";

let cachedClient = null;

export const getPayload = async () => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is not set");
  }

  if (!process.env.DATABASE_URI) {
    throw new Error("DATABASE_URI environment variable is not set");
  }

  if (cachedClient) {
    return cachedClient;
  }

  try {
    console.log("Initializing PayloadCMS client...");
    console.log("Database URI:", process.env.DATABASE_URI);
    
    const client = await payloadClient({
      config,
      options: {
        debug: process.env.NODE_ENV === "development",
      },
    });
    
    // Test the connection
    const testQuery = await client.find({
      collection: "posts",
      limit: 1
    });
    console.log("Test query result:", testQuery);
    
    console.log("PayloadCMS client initialized successfully");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Error initializing PayloadCMS client:", error);
    throw error;
  }
};
