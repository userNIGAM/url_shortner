import crypto from "crypto";

const generateShortId = (length = 8) => {
  return crypto
    .randomBytes(length)
    .toString("base64url")
    .slice(0, length);
};

export default generateShortId;