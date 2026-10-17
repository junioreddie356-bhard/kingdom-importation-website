import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "kingdom_admin_session";

function signValue(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "kingdom-importation-admin-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSession(username: string) {
  const token = `${username}:${signValue(username)}`;
  return token;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [username, signature] = token.split(":");
  if (!username || !signature) return false;

  return signature === signValue(username) && username === (process.env.ADMIN_USERNAME || "admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
