import { NextResponse } from "next/server";
import { getOrginalUrl } from "@/app/lib/urlStore";

interface RouteParams {
  params: Promise<{
    shortCode: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { shortCode } = await params;

  const originalUrl = getOrginalUrl(shortCode);

  if (!originalUrl) {
    return NextResponse.json({ error: "Short URL not found" }, { status: 404 });
  }

  return NextResponse.redirect(originalUrl);
}
