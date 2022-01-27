import express, { Request, Response } from "express";
import { findToken, generateWebTokens } from "../services/token.service";
import { saveToken } from "../services/token.service";
import { badRequestJSON, UserRecord } from "../helpers";
import { Admin } from "../models/Admin";
import bcrypt from "bcrypt";
import { Token } from "../models/Token";
import { User } from "../models/User";
import { validateRefreshToken } from "./../services/token.service";

const router = express.Router({ mergeParams: true });

router.post("/registration", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email }).lean();
    if (userCheck) {
      throw new Error(`${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user: UserRecord = await User.create({
      email: email,
      password: hashPassword,
    });

    const tokens = generateWebTokens({ _id: user._id });

    await saveToken(user._id, tokens.refreshToken);

    res.json({
      data: {
        isAdmin: false,
        userId: user._id.toHexString(),
        codeStatus: 200,
        message: "Пользователь зарегистрирован",
        ...tokens,
      },
    });
  } catch (error: any) {
    return badRequestJSON(res, 400, error.message);
  }
});

router.post("/login", async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user: UserRecord = await User.findOne({ email }).lean();

    if (!user) {
      throw new Error(`Пользователь с таким ${email} не найден`);
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new Error("Данные введены не корректно");
    }

    const tokens = generateWebTokens({ _id: user._id });

    const isAdmin = await Admin.findOne({ userId: user._id }).lean();

    await saveToken(user._id, tokens.refreshToken);

    res.json({
      data: {
        isAdmin: !!isAdmin,
        userId: user._id.toHexString(),
        codeStatus: 200,
        message: "Добро пожаловать",
        ...tokens,
      },
    });
  } catch (error: any) {
    return badRequestJSON(res, 400, error.message);
  }
});

router.delete("/logout", async function (req: any, res: Response) {
  try {
    const { refreshToken } = req.body;

    await Token.deleteOne({ refreshToken: refreshToken });

    res.json({
      data: {
        codeStatus: 200,
        message: "До свидания",
      },
    });
  } catch (error: any) {
    return badRequestJSON(res, 400, error.message);
  }
});

function isTokenIsValid(data: any, dbToken: any) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/refresh", async function (req: any, res: Response) {
  try {
    const { refreshToken } = req.body;

    const data: any = validateRefreshToken(refreshToken);
    const dbToken = await findToken(refreshToken);

    if (isTokenIsValid(data, dbToken)) {
      throw new Error("Unauthorized");
    }

    const tokens = generateWebTokens({ _id: data._id });

    await saveToken(data._id, tokens.refreshToken);

    const isAdmin = await Admin.findOne({ userId: data._id }).lean();

    res.json({
      data: {
        isAdmin: !!isAdmin,
        userId: data._id,
        codeStatus: 200,
        message: "Обновлено",
        ...tokens,
      },
    });
  } catch (error: any) {
    return badRequestJSON(res, 400, error.message);
  }
});

export default router;
