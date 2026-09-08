import Paste from "../models/Paste.ts";
import generateShortId from "../utils/generateShortId.ts";

type Request = {
  body: any;
  params: Record<string, string | undefined>;
};

type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => Response;
};

const expirationOptions = {
  never: null,

  "10m": 10 * 60 * 1000,

  "1h": 60 * 60 * 1000,

  "1d": 24 * 60 * 60 * 1000,

  "7d": 7 * 24 * 60 * 60 * 1000,
};

export const createPaste = async (req: Request, res: Response) => {
  try {
    const {
      content,
      language = "text",
      expiration = "never",
    } = req.body;
    console.log("Text Received")
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Paste content is required",
      });
    }
    console.log("Not Enough")
    if (!(expiration in expirationOptions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expiration option",
      });
    }
    console.log("Expired")
    let shortId;

    // Make sure the generated ID is unique
    while (true) {
      const generatedId = generateShortId();
      console.log("Id generated")
      const existingPaste = await Paste.findOne({
        shortId: generatedId,
      });

      if (!existingPaste) {
        shortId = generatedId;
        break;
      }
    }

    let expiresAt = null;

    const expirationTime =
      expirationOptions[expiration as keyof typeof expirationOptions];

    if (expirationTime) {
      expiresAt = new Date(Date.now() + expirationTime);
    }

    const paste = await Paste.create({
      shortId,
      content,
      language,
      expiresAt,
    });

    res.status(201).json({
      success: true,
      message: "Paste created successfully",
      paste: {
        id: paste.shortId,
        content: paste.content,
        language: paste.language,
        expiresAt: paste.expiresAt,
        views: paste.views,
        createdAt: paste.createdAt,
      },
    });
  } catch (error) {
    console.error("Create paste error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create paste",
    });
  }
};

export const getPaste = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;

    const paste = await Paste.findOne({
      shortId,
    });

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: "Paste not found or expired",
      });
    }

    paste.views += 1;

    await paste.save();

    res.status(200).json({
      success: true,
      paste: {
        id: paste.shortId,
        content: paste.content,
        language: paste.language,
        expiresAt: paste.expiresAt,
        views: paste.views,
        createdAt: paste.createdAt,
      },
    });
  } catch (error) {
    console.error("Get paste error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve paste",
    });
  }
};

export const deletePaste = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;

    const paste = await Paste.findOneAndDelete({
      shortId,
    });

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: "Paste not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Paste deleted successfully",
    });
  } catch (error) {
    console.error("Delete paste error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete paste",
    });
  }
};