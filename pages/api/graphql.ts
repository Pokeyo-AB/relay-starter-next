// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLResponse } from "relay-runtime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | GraphQLResponse>
) {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [] });
  }
}
