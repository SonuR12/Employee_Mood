import type { Metadata } from "next";
import MoodForm from "@/components/moodform/page";

export const metadata: Metadata = {
  title: "Submit Your Mood | Employee Mood Tracker",
  description: "Share your mood and help your team stay emotionally connected.",
};

export default function MoodPage() {
  return <MoodForm />;
}