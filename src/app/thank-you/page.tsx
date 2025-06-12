"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-100 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
      <motion.div
        className="max-w-md w-full p-8 text-center space-y-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">
          Thank You! 🎉
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Your mood has been recorded successfully.
        </p>

        <div className="flex flex-col gap-4 pt-4">
          <Link href="/">
            <Button className="w-full dark:bg-white/95">Return to Home</Button>
          </Link>

          <Link href="/admin">
            <Button variant="outline" className="w-full">
              Go to Admin Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
