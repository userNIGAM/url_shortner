import { NextResponse } from "next/server";
import { generateShortCode } from "@/app/lib/generateShortCode";
import { saveUrl } from "@/app/lib/urlStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Check whether it is actually a URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Generate unique short code
    const shortCode = generateShortCode();

    // Save mapping
    saveUrl(shortCode, url);

    // Create short URL
    const shortUrl = `http://localhost:3000/${shortCode}`;

    console.log("Original URL:", url);
    console.log("Short code:", shortCode);
    console.log("Short URL:", shortUrl);

    return NextResponse.json({
      message: "URL shortened successfully",
      shortCode,
      shortUrl,
      originalUrl: url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
