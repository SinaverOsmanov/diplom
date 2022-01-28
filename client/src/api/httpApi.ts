import { RoomFormType, UserType } from "../common/models";
import { messageNotification } from "../utils/notification";
import "dotenv";
import {
  getAccessToken,
  getRefreshToken,
  refreshUser,
} from "./../utils/localStorage";

async function apiRequest(
  path: string,
  method: string = "POST",
  body?: null | any
) {
  const API_URL = "/api/";

  await refreshUser(API_URL);

  const headers = new Headers();
  const token = getAccessToken();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  headers.append("Content-Type", "application/json");

  try {
    let response = await fetch(`${API_URL + path}`, {
      method: method,
      headers: headers,
      credentials: "include",
      body: method === "GET" ? undefined : JSON.stringify(body),
    });
    const { data } = await response.json();
    if (data.codeStatus >= 400) {
      throw new Error(data.message);
    }

    if (data.message) {
      messageNotification({
        codeStatus: data.codeStatus,
        messageRequest: data.message,
      });
    }

    return data;
  } catch (error: any) {
    messageNotification({ codeStatus: 400, messageRequest: error.message });
  }
}

export async function addRoomAPI({
  title,
  description,
  quality,
  photoUrl,
}: RoomFormType) {
  return apiRequest("rooms/addRoom", "POST", {
    title,
    description,
    quality,
    photoUrl,
  });
}

export async function updateRoomAPI({
  photoUrl,
  title,
  description,
  quality,
  roomId,
}: {
  roomId: string;
} & RoomFormType) {
  return apiRequest(`rooms/updateRoom/${roomId}`, "PATCH", {
    title,
    description,
    quality,
    photoUrl,
  });
}

export async function createUserAPI(user: UserType) {
  return apiRequest("auth/registration", "POST", user);
}

export async function logoutAPI() {
  return apiRequest("auth/logout", "DELETE", {
    refreshToken: getRefreshToken(),
  });
}

export async function loginUserAPI(user: UserType) {
  return apiRequest("auth/login", "POST", user);
}

export async function getRoomsAPI() {
  return apiRequest("rooms", "GET");
}

export async function getRoomsUnreservedAPI() {
  return apiRequest("rooms/unreservedRooms", "GET");
}

export async function getUserRoomsAPI() {
  return apiRequest("rooms/userRooms", "GET");
}

export async function getRoomAPI(id: string) {
  return apiRequest(`rooms/room/${id}`, "GET");
}

export async function reservRoomAPI(roomId: string) {
  return apiRequest(`rooms/reservRoom`, "PATCH", { roomId });
}

export async function unReservRoomAPI(roomId: string) {
  return apiRequest(`rooms/unReservRoom`, "PATCH", { roomId });
}
