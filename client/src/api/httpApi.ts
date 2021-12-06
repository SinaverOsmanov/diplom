import { RoomFormType, UserType } from "../common/models";
import { useEnvironment } from "../config.json";
import { getDataLocalStorage } from "../utils/localStorage";
import { messageNotification } from "../utils/notification";

async function apiRequest(
  path: string,
  method: string = "POST",
  body?: null | any
) {
  const API_URL = useEnvironment ? "http://localhost:8080/api/" : "/api/";
  const headers = new Headers();
  const token = getDataLocalStorage("access-token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
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
  return apiRequest("registration", "POST", user);
}

export async function refreshUserAPI() {
  return apiRequest("refresh", "GET");
}

export async function logoutAPI() {
  return apiRequest("logout", "DELETE");
}

export async function loginUserAPI(user: UserType) {
  return apiRequest("login", "POST", user);
}

export async function getRoomsAPI() {
  return apiRequest("rooms", "GET");
}

export async function getRoomsUnreservedAPI() {
  return apiRequest("unreservedRooms", "GET");
}

export async function getUserRoomsAPI() {
  return apiRequest("userRooms", "GET");
}

export async function getRoomAPI(id: string) {
  return apiRequest(`rooms/${id}`, "GET");
}

export async function reservRoomAPI(roomId: string) {
  return apiRequest(`reservRoom`, "PATCH", { roomId });
}

export async function unReservRoomAPI(roomId: string) {
  return apiRequest(`unReservRoom`, "PATCH", { roomId });
}
