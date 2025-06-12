'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";

type MoodOption = "happy" | "neutral" | "sad";

const moodOptions: { emoji: string; label: string; value: MoodOption }[] = [
  { emoji: "😄", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😞", label: "Sad", value: "sad" },
];

export default function MoodPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!employeeId.trim() || !employeeName.trim()) {
      toast.error("Please enter your Employee ID and Name.");
      return;
    }
    if (!selectedMood) {
      toast.error("Please select a mood first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, employeeName, mood: selectedMood, comment }),
      });

      if (res.ok) {
        toast.success("Mood submitted successfully 🎉");
        setTimeout(() => router.push("/thank-you"), 700);
      } else {
        throw new Error("Failed to submit mood.");
      }
    } catch (err: any) {
      toast.error("Error submitting mood", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-tr from-amber-100 via-white to-sky-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
        <motion.div
          className="max-w-md w-full space-y-6 text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            How are you feeling today?
          </h2>

          {/* Employee ID */}
          <Input
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-2"
          />

          {/* Employee Name */}
          <Input
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="mt-2"
          />

          {/* Mood Options */}
          <div className="flex justify-center gap-6">
            {moodOptions.map(({ emoji, label, value }) => (
              <button
                key={value}
                onClick={() => setSelectedMood(value)}
                className={`flex flex-col items-center px-3 py-2 w-20 rounded-xl transition-all border-2 ${
                  selectedMood === value
                    ? "border-pink-500 bg-pink-100 dark:bg-pink-900"
                    : "border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Optional Comment */}
          <Textarea
            placeholder="Any comments you'd like to add?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-4"
          />

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 text-lg hover:cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Mood"}
          </Button>
        </motion.div>
      </main>

      {/* Toast UI Render */}
      <Toaster />
    </>
  );
}

