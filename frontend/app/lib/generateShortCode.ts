import { shortCodeExists } from "./urlStore";

export function generateShortCode(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let shortCode = "";

  do {
    shortCode = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      shortCode += characters[randomIndex];
    }
  } while (shortCodeExists(shortCode));

  return shortCode;
}
