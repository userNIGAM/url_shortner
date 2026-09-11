import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import Organization from "../models/Organization.ts";
import generateToken from "../helper/generateToken.js";
import setAuthCookie from "../helper/setAuthCookie.js";
import jwt from "jsonwebtoken";
import Project from "../models/Project.ts";
export const register = async (req: any, res: any) => {
  try {
    const { organizationName, name, email, password } = req.body;

    // Required fields
    if (!organizationName || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate name
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const slug = organizationName.toLowerCase().trim().replace(/\s+/g, "-");
    const existingOrganization = await Organization.findOne({ slug });
    if (existingOrganization) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await Organization.create({
      name: organizationName,
      slug,
    });

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      organization: organization._id,
      role: "owner",
    });

    // Generate JWT
    // const token = generateToken(user._id.toString());
    const token = jwt.sign(
      {
        userId: user._id,
        organizationId: organization._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );
    // Set cookie
    setAuthCookie(res, token);

    // Response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: {
          id: organization._id,
          name: organization.name,
          slug: organization.slug,
        },
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Invalid credentials
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign({
      userId : user._id.toString(),
      organizationId : user.organization.toString(),
      role : user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn : "7d"
    }
  )

    // Set cookie
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role : user.role,
        organization : user.organization, 
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = async (req: any, res: any) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getMe = async (req: any, res: any) => {
  try {
    console.log("Req.user : ", req.user);
    console.log("Req.user TYPE : ", typeof req.user);
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get me error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

/*

        Dashboard Controller

*/

export const getDashboard = async (req: any, res: any) => {
  try {
    return res.status(200).json({
      success: true,
      message: "welcome to Your organization Dashboard",

      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      organization: req.user.organization,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


/*

            products controller

*/
export const createProject = async(req : any, res : any)=>{
  try{
    const {name, description} = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name,
      description,
      organization : req.user.organization
    })

    return res.status(201).json({
      success : true,
      message : "Project Created Successfully",
      project,
    })
  }catch(error){
    console.error("Create Project Error :",error)

    return res.status(500).json({
      success : false,
      message : "Something Went Wrong"
    })
  }

}