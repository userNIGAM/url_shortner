import User from "./../models/User";
import bcrypt from "bcryptjs";
export const createMember = async (req: any, res: any) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (role !== "admin" && role !== "member") {
      return res.status(400).json({
        success: false,
        message: "Invalid Role",
      });
    }
    // 2. Check whether email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Exists",
      });
    }
    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // IMPORTANT
      // Take organization from logged-in owner
      organization: req.user.organization,
      role,
    });

    // 5. Return response
    return res.status(201).json({
      success: true,
      message: "Member created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
      },
    });
  } catch (error) {
    console.log("Member creation failed: ", error);

    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const getMembers = async (req: any, res: any) => {
  try {
    const members = await User.find({
      organization: req.user.organization,
    }).select("-password");

    return res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("Get Members Error : ", error);

    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const updateMemberRole = async (req: any, res: any) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    if (role !== "admin" && role !== "member") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findOne({
      _id: req.params.id,
      organization: req.user.organization,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    user.role = role;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Member role updated successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update member role error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteMember = async (req: any, res: any) => {
  try {
    const loggedInUser = req.user;

    if (loggedInUser.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Access Denied! Only organization owner can perform this task",
      });
    }

    const { id } = req.params;
    const user = await User.findOne({
      _id: id,
      organization: req.user.organization,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const role = user.role;

    const isOwner = role === "owner";

    if (isOwner) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    await user.deleteOne();

    console.log("Deleting User");
    return res.status(200).json({
      success: true,
      message: "User deleted Successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Deleting Error: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
