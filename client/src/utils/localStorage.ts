import { IUserDataRequest } from "../common/models";

const ACCESS_KEY = "accesToken";
const REFRESH_KEY = "refreshToken";
const EXPIRES_KEY = "expiresIn";
const USERID_KEY = "userId";
const ADMIN_KEY = "admin";

export function getDataLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export function setTokens({
  refreshToken,
  accessToken,
  expiresIn = 3600,
  userId,
  isAdmin,
}: IUserDataRequest) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, JSON.stringify(expiresDate));
  localStorage.setItem(ADMIN_KEY, JSON.stringify(isAdmin));
}

export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  const expiresIn = localStorage.getItem(EXPIRES_KEY);
  return Number(expiresIn);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function getAdminStorage() {
  const isAdmin = localStorage.getItem(ADMIN_KEY);
  return isAdmin ? JSON.parse(isAdmin) : null;
}

export async function refreshUser(API_URL: string) {
  const refreshToken = getRefreshToken();
  const expiresDate = getTokenExpiresDate();

  if (refreshToken && expiresDate < Date.now()) {
    const response = await fetch(`${API_URL}auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();

    setTokens({
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      expiresIn: data.expiresIn,
      userId: data.userId,
      isAdmin: data.isAdmin,
    });
  }
  return;
}

// export function setDataLocalStorage<T>(key: string, response: T): void {
//   if (response) {
//     localStorage.setItem(key, JSON.stringify(response));
//   }
// }

// export function removeDataLocalStorage(key: string) {
//   localStorage.removeItem(key);
// }
