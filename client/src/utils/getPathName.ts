export function getPathName(pathname: string) {
  return pathname.replace(/\//gim, "");
}
