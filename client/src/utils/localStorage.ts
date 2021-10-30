export function getDataLocalStorage() {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export function setDataLocalStorage<T>(response: T): void {
  if (response) {
    localStorage.setItem("data", JSON.stringify(response));
  }
}

export function removeDataLocalStorage() {
  localStorage.removeItem("data");
}
