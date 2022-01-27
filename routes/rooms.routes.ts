import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  RoomRecord,
  roomsMapObjectIdToString,
  badRequestJSON,
  isAdmin,
} from "../helpers";
import { Room } from "../models/Room";

const router = express.Router({ mergeParams: true });

router.get("/", async function (req: Request, res: Response) {
  try {
    const rooms: RoomRecord[] = await Room.find().lean();
    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.post("/addRoom", async function (req: any, res: Response) {
  try {
    const roomId = new ObjectId();
    const { title, description, quality, photoUrl } = req.body;

    const adminExist = await isAdmin(req.user._id);
    if (!adminExist) {
      throw new Error("Вы не являетесь админом");
    }

    const countDocuments = await Room.count();
    const room = await Room.create({
      _id: roomId,
      title: title,
      description: description,
      quality: quality,
      photoUrl: photoUrl,
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

router.patch("/updateRoom/:id", async function (req: any, res: Response) {
  try {
    const roomId = new ObjectId(req.params.id);
    const { title, description, quality, photoUrl } = req.body;

    const adminExist = await isAdmin(req.user._id);
    if (!adminExist) {
      throw new Error("Вы не являетесь админом");
    }

    const updatedRoom = await Room.updateOne(
      { _id: roomId },
      { $set: { title, description, quality, photoUrl } }
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
});

router.patch("/reservRoom", async function (req: any, res: Response) {
  try {
    const userId = req.user._id;
    const { roomId } = req.body;

    const findRoom = await Room.findOne({ _id: new ObjectId(roomId) }).lean();
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

    const findRoom = await Room.findOne({ _id: new ObjectId(roomId) }).lean();

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

router.get("/room/:id", async function (req: Request, res: Response) {
  try {
    const id = req.params.id;
    const room = await Room.findOne({ _id: id }).lean();

    if (!room) {
      throw new Error("Комната не найдена");
    }

    res.send(JSON.stringify({ data: { room, codeStatus: 200 } }));
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/userRooms", async function (req: any, res: Response) {
  try {
    const rooms: RoomRecord[] = await Room.find({
      reserved: new ObjectId(req.user._id),
    }).lean();

    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

router.get("/unreservedRooms", async function (req: Request, res: Response) {
  try {
    const rooms: RoomRecord[] = await Room.find({
      reserved: null,
    }).lean();
    const mapRooms = roomsMapObjectIdToString(rooms);
    res.send({ data: { rooms: mapRooms, codeStatus: 200 } });
  } catch (error: any) {
    badRequestJSON(res, 400, error.message);
  }
});

export default router;
