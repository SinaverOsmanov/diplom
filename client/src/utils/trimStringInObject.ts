export function trimStringInObject(values: { [key: string]: string | null }) {
  let obj = {};

  for (const [key, value] of Object.entries(values)) {
    let r = { [key]: typeof value === "string" ? value.trim() : value };
    Object.assign(obj, r);
  }

  return obj;
}
