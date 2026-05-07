"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDownTray, HiXMark } from "react-icons/hi2";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const DISMISS_KEY = "pwa-install-dismissed";
const DISMISS_DAYS = 14;

function isDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const ts = window.localStorage.getItem(DISMISS_KEY);
    if (!ts) return false;
    const ms = parseInt(ts, 10);
    if (!Number.isFinite(ms)) return false;
    return Date.now() - ms < DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS legacy
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) {
      setInstalled(true);
      return;
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      if (isDismissed()) return;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    const onInstalled = () => {
      setInstalled(true);
      setShow(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/maintenance") || pathname?.startsWith("/offline")) {
    return null;
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } catch {
      /* swallow — user closed the prompt */
    }
    setDeferredPrompt(null);
    setShow(false);
  };

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* storage may be blocked */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed left-3 right-3 bottom-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[60]"
        >
          <div className="rounded-2xl border border-white/10 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/30 p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              <HiArrowDownTray className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-white text-sm sm:text-base">Install Sayantan Kar</h4>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                Add to your home screen for a faster, app-like experience with offline support.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleInstall}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs sm:text-sm font-medium shadow hover:shadow-lg transition-all"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 rounded-full text-gray-400 text-xs sm:text-sm hover:text-white hover:bg-white/5 transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Close install prompt"
              className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors shrink-0"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
