import type { NextApiRequest, NextApiResponse } from "next";
import packageJson from "../../package.json";
import {
  checkMongoConnection,
  isMongoConfigured,
} from "../../lib/mongodb/client";

type StatusResponse = {
  ok: true;
  service: "frasma";
  version: string;
  timestamp: string;
  persistence: {
    configured: boolean;
    connected: boolean;
  };
};

type ErrorResponse = {
  ok: false;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse | ErrorResponse>,
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const configured = isMongoConfigured();
  const connected = configured ? await checkMongoConnection() : false;

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  return res.status(200).json({
    ok: true,
    service: "frasma",
    version: packageJson.version,
    timestamp: new Date().toISOString(),
    persistence: {
      configured,
      connected,
    },
  });
}
