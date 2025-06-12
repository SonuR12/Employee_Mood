import type { Metadata } from "next";
import AdminPage from "@/components/admin/page";

export const metadata: Metadata = {
  title: "Admin | Employee Mood Tracker",
  description: "Manage and view employee mood submissions.",
};

export default function MoodPage() {
  return <AdminPage />;
}