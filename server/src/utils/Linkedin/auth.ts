import express, { Request, Response } from "express";
import axios from "axios";

// app.get("/auth", (req: Request, res: Response) => {
//   const authUrl = getAuthorizationUrl();
//   res.redirect(authUrl);
// });

// app.get("/auth/callback", async (req: Request, res: Response) => {
//   const code = req.query.code as string;
//   const tokenResponse = await exchangeCodeForToken(code);

//   const accessToken = tokenResponse.data.access_token;
//   const profileData = await getProfileData(accessToken);

//   res.json(profileData);
// });

export function getAuthorizationUrl(): string {
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress&state=123456789&nonce=123456`;
}

export async function exchangeCodeForToken(code: string) {
  return await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`
  );
}

export async function getProfileData(accessToken: string) {
  return await axios.get("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
