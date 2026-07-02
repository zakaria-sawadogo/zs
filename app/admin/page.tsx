import { notFound } from "next/navigation";
import { isAdminEnabled } from "@/lib/paths";

export const metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  if (!isAdminEnabled()) {
    notFound();
  }

  const { AdminDashboard } = await import("@/components/admin/admin-dashboard");

  return <AdminDashboard />;
}
