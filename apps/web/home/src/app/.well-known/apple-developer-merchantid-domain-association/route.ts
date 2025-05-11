import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public/apple-developer-merchantid-domain-association"
    );
    const fileContent = readFileSync(filePath, "utf-8");

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new NextResponse("Not Found", { status: 404 });
  }
}
