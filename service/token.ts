import jwt from "jsonwebtoken";
import { config } from "./../config/config";
import { Token } from "./../models/Token";
import { ObjectId } from "mongodb";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

export function generateWebTokens(payload: any) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN!, {
    expiresIn: "30d",
  });
  return { accessToken };
}

export async function saveToken(userId: ObjectId, accessToken: string) {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.accessToken = accessToken;
    return tokenData.save();
  }

  const token = await Token.create({ user: userId, accessToken });
  return token;
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
