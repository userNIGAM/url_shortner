import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decode = jwt.verify(token, secret) as jwt.JwtPayload & {
      userId: string;
    };

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error :", error);
    return res
      .status(401)
      .json({ success: false, 
        message: "Invalid or expired authentication" });
  }
};
