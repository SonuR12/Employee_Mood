"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-rose-50 to-orange-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-700 px-4">
      {/* Decorative Blur Circle */}
      <div className="absolute w-[400px] h-[400px] bg-pink-300 dark:bg-pink-500 rounded-full opacity-30 blur-3xl top-[-100px] left-[-100px] z-0" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-200 dark:bg-indigo-400 rounded-full opacity-30 blur-2xl bottom-[-80px] right-[-80px] z-0" />

      {/* Content */}
      <motion.div
        className="z-10 max-w-xl w-full text-center space-y-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to{" "}
          <span className="text-pink-500 dark:text-pink-400">Mood Tracker</span>{" "}
          🧠
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground dark:text-zinc-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          A simple way to log your mood and help your team stay emotionally
          connected.
        </motion.p>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button className="px-6 py-5 text-lg rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
            <Link href="/mood">Submit Your Mood</Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
