import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const validUsername = process.env.ADMIN_USERNAME || "admin";
  const validPassword = process.env.ADMIN_PASSWORD || "kingz2026";

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const token = createAdminSession(username);
  const response = NextResponse.json({ ok: true, message: "Logged in" });

  response.cookies.set("kingdom_admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
