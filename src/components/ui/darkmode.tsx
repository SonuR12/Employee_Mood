"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";

export default function DarkMode() {
  const [dark, setDark] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);

    document.documentElement.classList.add("transition-colors", "duration-500");
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);

    const newDark = !dark;
    document.documentElement.classList.add("transition-colors", "duration-500");
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setDark(newDark);
  };

  return (
    <>
      <Button
        onClick={toggleDark}
        className="absolute top-6 right-6 z-50 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-zinc-700 rounded-full px-3 py-1 shadow hover:scale-105 hover:cursor-pointer transition duration-300"
        aria-label="Toggle dark mode"
      >
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ rotate: 180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? "🌞" : "🌙"}
        </motion.span>
      </Button>
      <AnimatePresence>
        {flash && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-black z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
