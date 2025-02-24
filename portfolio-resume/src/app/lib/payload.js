import { getPayload as payloadClient } from "payload";
import configPromise from "@payload-config";

export async function getPayload() {
  const config = await configPromise;
  return payloadClient({
    config,
  });
}
