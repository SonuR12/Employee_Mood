'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type MoodEntry = {
  employeeId: string;
  employeeName: string;
  mood: "happy" | "neutral" | "sad";
  comment: string;
  timestamp: string;
};

export default function AdminPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    // Load from localStorage
    let localEntries: MoodEntry[] = [];
    const local = localStorage.getItem("moodEntries");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) localEntries = parsed;
      } catch (error) {
        console.error("Invalid JSON in localStorage");
      }
    }

    const fetchMoods = async () => {
      try {
        const res = await fetch("/api/mood");
        const apiEntries: MoodEntry[] = await res.json();

        // Merge and deduplicate by timestamp (or employeeId+timestamp if needed)
        const allEntries = [...localEntries, ...apiEntries].reduce((acc, curr) => {
          if (!acc.find(e => e.timestamp === curr.timestamp && e.employeeId === curr.employeeId)) {
            acc.push(curr);
          }
          return acc;
        }, [] as MoodEntry[]);

        // Save merged to localStorage and state
        setEntries(allEntries.reverse());
        localStorage.setItem("moodEntries", JSON.stringify(allEntries));
        console.log(allEntries)
      } catch (error) {
        // fallback to local only
        setEntries(localEntries.reverse());
        console.warn("API fetch failed. Using localStorage only.");
      }
    };

    fetchMoods();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 xl:py-12 bg-gradient-to-br from-slate-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-700 transition duration-500">
      <motion.div
        className="max-w-5xl w-full mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white/85">
          Mood Entries Dashboard
        </h1>

        <div className="overflow-x-auto w-full transition duration-300">
          <Table>
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="w-[120px]">Employee ID</TableHead>
                <TableHead className="w-[160px]">Employee Name</TableHead>
                <TableHead className="w-[100px]">Mood</TableHead>
                <TableHead className="w-[100px]">Comment</TableHead>
                <TableHead className="w-[100px] text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No entries yet.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => (
                  <TableRow key={index} className="text-left">
                    <TableCell className="text-sm text-gray-800 dark:text-gray-200">
                      {entry.employeeId || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-800 dark:text-gray-200">
                      {entry.employeeName || "—"}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {entry.mood === "happy" ? "😄" : entry.mood === "neutral" ? "😐" : "😞"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 dark:text-gray-300 text-left">
                      {entry.comment || "—"}
                    </TableCell>
                    <TableCell className="text-xs text-right text-gray-500 dark:text-gray-400">
                      {new Date(entry.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </main>
  );
}
