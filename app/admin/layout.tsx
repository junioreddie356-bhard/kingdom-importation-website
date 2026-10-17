import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await isAdminAuthenticated();

  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
