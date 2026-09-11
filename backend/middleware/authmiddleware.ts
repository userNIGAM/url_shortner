import jwt from "jsonwebtoken";
import User from "../models/User";

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      organizationId: string;
      role: string;
    };

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware
