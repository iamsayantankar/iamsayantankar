"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiSignal, HiSignalSlash, HiArrowPath } from "react-icons/hi2";

export default function OfflineClient() {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => {
      setOnline(true);
      window.location.replace("/");
    };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary-500/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
            className={`mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl shadow-2xl ${
              online
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30"
                : "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30"
            }`}
          >
            {online ? <HiSignal className="h-10 w-10" /> : <HiSignalSlash className="h-10 w-10" />}
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {online ? "You're back online" : "You are offline"}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-400 mx-auto max-w-md">
            {online
              ? "Reconnecting now — taking you home."
              : "No internet connection detected. Cached pages and content are still available; we'll restore everything once you're back online."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
            >
              <HiArrowPath className="h-5 w-5" /> Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm sm:text-base hover:bg-white/10 transition-all"
            >
              Go home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
