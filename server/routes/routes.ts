import express, { Request, Response } from "express";
import {
  RoomRecord,
  uploadFiles,
  roomsMapObjectIdToString,
  UserRecord,
  userDto,
  getTokenData,
  badRequestJSON,
} from "../helpers";
import { ObjectId } from "mongodb";
import { Room } from "./../models/Room";
import { User } from "./../models/User";
import bcrypt from "bcrypt";
import { generateWebTokens, saveToken } from "./../service/token";
import { Token } from "./../models/Token";
import { Admin } from "./../models/Admin";
import { Error } from "mongoose";

// ROUTES
const router = express.Router();

router.post("/registration", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      throw new Error(`${email} уже существует`);
    }

    const userId = new ObjectId();

    const hashPassword = await bcrypt.hash(password, 3);
    const user: UserRecord = await User.create({
      _id: userId,
      email: email,
      password: hashPassword,
    });

    const userData = userDto(user);
    const { accessToken } = generateWebTokens(userData);

    await saveToken(userData.id, accessToken);

    res.cookie("accessToken", accessToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({
      data: {
        isAdmin: null,
        user: userData.id.toHexString(),
        codeStatus: 200,
        message: "Пользователь зарегистрирован",
      },
    });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.post("/login", async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user: UserRecord = await User.findOne({
      email: email,
    });
    if (!user) {
      throw new Error(`Пользователь с таким ${email} не найден`);
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new Error(`Данные введены не корректно`);
    }
    const userData = userDto(user);
    const { accessToken } = generateWebTokens({
      ...userData,
    });

    const isAdmin = await Admin.findOne({ userId: user._id });

    await saveToken(userData.id, accessToken);

    res.cookie("accessToken", accessToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({
      data: {
        isAdmin: !!isAdmin,
        user: userData.id.toHexString(),
        codeStatus: 200,
        message: "Добро пожаловать",
      },
    });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.delete("/logout", async function (req: Request, res: Response) {
  try {
    const { accessToken } = req.cookies;
    await Token.deleteOne({ accessToken });
    res.clearCookie("accessToken");
    res.json({
      data: {
        codeStatus: 200,
        message: "До свидания",
      },
    });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.post("/rooms/addRoom", async function (req: Request, res: Response) {
  try {
    const roomId = new ObjectId();

    const { title, description, quality, file } = req.body;
    const fileId = await uploadFiles(file);

    const countDocuments = await Room.count();
    const room = await Room.create({
      _id: roomId,
      title: title,
      description: description,
      quality: quality,
      photoId: fileId || null,
      roomNumber: countDocuments + 1,
      reserved: null,
    });
    if (room) {
      res.json({
        data: {
          roomId: room._id.toHexString(),
          codeStatus: 201,
          message: "Комната добавлена",
        },
      });
    }
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.patch(
  "/rooms/updateRoom/:id",
  async function (req: Request, res: Response) {
    try {
      const roomId = new ObjectId(req.params.id);
      const { title, description, quality } = req.body;

      const updatedRoom = await Room.update(
        { _id: roomId },
        { $set: { title, description, quality } }
      );
      if (updatedRoom) {
        res.json({
          data: {
            roomId: roomId.toHexString(),
            codeStatus: 202,
            message: "Данные комнаты изменены",
          },
        });
      }
    } catch (error: any) {
      badRequestJSON(res, 400, error.message);
    }
  }
);

router.patch("/reservRoom", async function (req: Request, res: Response) {
  try {
    const { id: userId } = getTokenData(req.cookies);
    const { roomId } = req.body;

    const findRoom = await Room.findOne({ _id: new ObjectId(roomId) });
    if (!findRoom.reserved) {
      const result = await Room.updateOne(
        { _id: new ObjectId(roomId) },
        { $set: { reserved: new ObjectId(userId) } }
      );

      if (result) {
        res.send(
          JSON.stringify({
            data: {
              roomId: findRoom._id.toHexString(),
              codeStatus: 200,
              message: "Бронирование прошло успешно",
            },
          })
        );
      }
    } else {
      throw new Error("комната уже забронирована");
    }
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.patch("/unreservRoom", async function (req: Request, res: Response) {
  try {
    const { roomId } = req.body;

    const findRoom = await Room.findOne({ _id: new ObjectId(roomId) });
    if (findRoom.reserved) {
      const result = await Room.updateOne(
        { _id: new ObjectId(roomId) },
        { $set: { reserved: null } }
      );

      if (result) {
        res.send(
          JSON.stringify({
            data: {
              roomId: findRoom._id.toHexString(),
              codeStatus: 200,
              message: "Отмена бронирования прошла успешно",
            },
          })
        );
      }
    } else {
      throw new Error("комната уже не забронирована");
    }
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/rooms/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const room = await Room.findOne({ _id: id });

    if (!room) {
      throw new Error("Комната не найдена");
    }

    res.send(JSON.stringify({ data: { room, codeStatus: 200 } }));
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/rooms", async (req: Request, res: Response) => {
  try {
    const rooms: RoomRecord[] = await Room.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "photoId",
          foreignField: "_id",
          as: "photo",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: {
            $first: "$title",
          },
          description: {
            $first: "$description",
          },
          quality: {
            $first: "$quality",
          },
          photo: {
            $first: {
              $arrayElemAt: ["$photo.image", 0],
            },
          },
          roomNumber: {
            $first: "$roomNumber",
          },
          reserved: {
            $first: "$reserved",
          },
        },
      },
    ]);
    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/userRooms", async (req: Request, res: Response) => {
  try {
    const { id: userId } = getTokenData(req.cookies);
    const rooms: RoomRecord[] = await Room.aggregate([
      {
        $match: {
          reserved: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "images",
          localField: "photoId",
          foreignField: "_id",
          as: "photo",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: {
            $first: "$title",
          },
          description: {
            $first: "$description",
          },
          quality: {
            $first: "$quality",
          },
          photo: {
            $first: {
              $arrayElemAt: ["$photo.image", 0],
            },
          },
          roomNumber: {
            $first: "$roomNumber",
          },
          reserved: {
            $first: "$reserved",
          },
        },
      },
    ]);
    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/unreservedRooms", async (req: Request, res: Response) => {
  try {
    const rooms: RoomRecord[] = await Room.aggregate([
      {
        $match: {
          reserved: null,
        },
      },
      {
        $lookup: {
          from: "images",
          localField: "photoId",
          foreignField: "_id",
          as: "photo",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: {
            $first: "$title",
          },
          description: {
            $first: "$description",
          },
          quality: {
            $first: "$quality",
          },
          photo: {
            $first: {
              $arrayElemAt: ["$photo.image", 0],
            },
          },
          roomNumber: {
            $first: "$roomNumber",
          },
          reserved: {
            $first: "$reserved",
          },
        },
      },
    ]);
    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

module.exports = router;
