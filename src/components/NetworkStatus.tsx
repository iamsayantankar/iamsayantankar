"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSignal, HiSignalSlash } from "react-icons/hi2";

export default function NetworkStatus() {
  const [online, setOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setOnline(navigator.onLine);
    if (!navigator.onLine) setShowBanner(true);

    const goOnline = () => {
      setOnline(true);
      setShowBanner(true);
      window.setTimeout(() => setShowBanner(false), 2500);
    };
    const goOffline = () => {
      setOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-0 inset-x-0 z-[110] flex justify-center pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div
            className={`pointer-events-auto mt-2 sm:mt-3 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg backdrop-blur-xl border ${
              online
                ? "bg-emerald-500/90 text-white border-emerald-400/40 shadow-emerald-500/30"
                : "bg-rose-500/90 text-white border-rose-400/40 shadow-rose-500/30"
            }`}
          >
            {online ? (
              <>
                <HiSignal className="w-4 h-4" /> Back online
              </>
            ) : (
              <>
                <HiSignalSlash className="w-4 h-4" /> You are offline — showing cached content
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
