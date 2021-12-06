export function getDataLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export function setDataLocalStorage<T>(key: string, response: T): void {
  if (response) {
    localStorage.setItem(key, JSON.stringify(response));
  }
}

export function removeDataLocalStorage(key: string) {
  localStorage.removeItem(key);
}
