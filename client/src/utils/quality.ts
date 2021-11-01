export function qualityTitle(str: string) {
  switch (str) {
    case "economy":
      return { text: "Эконом", color: "#52c41a" };
    case "standart":
      return { text: "Стандарт", color: "#108ee9" };
    case "lux":
      return { text: "Люкс", color: "#ff2300" };
    default:
      return { text: "Неизвесто", color: "#ссс" };
  }
}
