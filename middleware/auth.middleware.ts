import { NextFunction, Response } from "express";
import { badRequestJSON } from "../helpers";
import { validateAccessToken } from "../services/token.service";

export default function auth(req: any, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return badRequestJSON(res, 400, "Unauthorized");
    }
    const data = validateAccessToken(token);
    req.user = data;
    next();
  } catch (error) {
    return badRequestJSON(res, 400, "Unauthorized");
  }
}
