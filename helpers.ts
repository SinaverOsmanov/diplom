import { Image } from "./models/Image";
import { ObjectId } from "mongodb";
import { validateAccessToken } from "./services/token.service";
import { Response } from "express";
import { Admin } from "./models/Admin";

export type UserRecord = {
  _id: ObjectId;
  email: string;
  password: string;
};

export type RoomRecord = {
  _id: ObjectId;
  title: string;
  description: string;
  quality: string;
  photoUrl: string | null;
  roomNumber: number;
  reserved: ObjectId | null;
};

export async function uploadFiles(file: string) {
  try {
    const id = new ObjectId();
    const image = new Image({ _id: id, image: file });
    await image.save();
    return id;
  } catch (error) {
    console.log(error);
  }
}

export function roomsMapObjectIdToString(rooms: RoomRecord[]) {
  const sortRooms = rooms.sort(
    (a: RoomRecord, b: RoomRecord) => a.roomNumber - b.roomNumber
  );
  return sortRooms.map((room: RoomRecord) => ({
    ...room,
    _id: room._id.toHexString(),
    reserved: room.reserved ? room.reserved.toHexString() : null,
  }));
}

export function badRequestJSON(res: Response, status: number, message: string) {
  res.json({
    data: { codeStatus: status, message: message },
  });
}

export async function isAdmin(userId: string): Promise<string | null> {
  return await Admin.findOne({ userId });
}
