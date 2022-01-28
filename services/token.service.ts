import jwt, { JwtPayload } from "jsonwebtoken";
import { Token } from "../models/Token";
import { ObjectId } from "mongodb";
import "dotenv";
// import path from "path";

export function generateWebTokens(payload: any) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN!, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN!);

  return { accessToken, refreshToken, expiresIn: 3600 };
}

export async function saveToken(userId: ObjectId, refreshToken: string) {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  return token;
}

export function validateRefreshToken(refreshToken: string) {
  try {
    if (!process.env.JWT_REFRESH_TOKEN) return null;

    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    return userData;
  } catch (e) {
    return null;
  }
}

export function validateAccessToken(token: string) {
  try {
    if (process.env.JWT_ACCESS_TOKEN) {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      return userData;
    }
  } catch (e) {
    return null;
  }
}

export async function findToken(refreshToken: string) {
  try {
    return await Token.findOne({ refreshToken: refreshToken });
  } catch (error) {
    return null;
  }
}
