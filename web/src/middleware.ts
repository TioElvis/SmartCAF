import { NextResponse } from "next/server";
import { BASE_API_URL } from "./lib/constants";
import type { MiddlewareConfig } from "next/server";

export async function middleware() {
  try {
    await fetch(new URL("/", BASE_API_URL));
  } catch (error) {
    return NextResponse.json(
      { error, text: "API is not responding" },
      { status: 500 },
    );
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
