"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiWrenchScrewdriver, HiSparkles } from "react-icons/hi2";

type MaintenanceData = {
  maintenance: boolean;
  title: string;
  message: string;
  endDate: string | null;
};

type TimePart = { label: string; value: number };

function getTimeParts(endDate: string | null): TimePart[] | null {
  if (!endDate) return null;
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) {
    return [
      { label: "Days", value: 0 },
      { label: "Hours", value: 0 },
      { label: "Minutes", value: 0 },
      { label: "Seconds", value: 0 },
    ];
  }
  return [
    { label: "Days", value: Math.floor(diff / 86_400_000) },
    { label: "Hours", value: Math.floor((diff / 3_600_000) % 24) },
    { label: "Minutes", value: Math.floor((diff / 60_000) % 60) },
    { label: "Seconds", value: Math.floor((diff / 1000) % 60) },
  ];
}

export default function MaintenancePage() {
  const [data, setData] = useState<MaintenanceData>({
    maintenance: true,
    title: "We'll Be Back Soon!",
    message:
      "We're performing scheduled maintenance to improve your experience. We'll be back shortly.",
    endDate: null,
  });
  const [parts, setParts] = useState<TimePart[] | null>(null);
  const [checking, setChecking] = useState(false);
  const redirected = useRef(false);

  const goLive = useCallback(() => {
    if (redirected.current) return;
    redirected.current = true;
    window.location.replace("/");
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/maintenance-status", { cache: "no-store" });
      if (!res.ok) return;
      const json: MaintenanceData = await res.json();
      if (!json.maintenance) {
        goLive();
        return;
      }
      setData(json);
    } catch {
      // ignore — next poll will retry
    }
  }, [goLive]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    setParts(getTimeParts(data.endDate));
    if (!data.endDate) return;

    const tick = () => {
      const next = getTimeParts(data.endDate);
      setParts(next);
      if (next && next.every((p) => p.value === 0) && !checking) {
        setChecking(true);
        fetchStatus().finally(() => setChecking(false));
      }
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [data.endDate, checking, fetchStatus]);

  useEffect(() => {
    const poll = setInterval(fetchStatus, 30_000);
    return () => clearInterval(poll);
  }, [fetchStatus]);

  const countdownDone =
    parts !== null && parts.every((p) => p.value === 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-purple-600 shadow-2xl shadow-primary-500/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear",
              }}
            >
              <HiWrenchScrewdriver className="h-12 w-12 text-white" />
            </motion.div>
          </motion.div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gray-300 backdrop-blur-xl">
            <HiSparkles className="h-3.5 w-3.5 text-primary-400" />
            Under Maintenance
          </div>

          <h1 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-3xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-transparent break-words">
            {data.title}
          </h1>

          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-gray-400">
            {data.message}
          </p>

          {parts && !countdownDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-8 sm:mt-10 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4"
            >
              {parts.map((part) => (
                <div
                  key={part.label}
                  className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-5 backdrop-blur-xl"
                >
                  <div className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-xl sm:text-4xl lg:text-5xl font-bold tabular-nums text-transparent">
                    {String(part.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500">
                    {part.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {countdownDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-3 text-sm text-primary-300"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary-400" />
              Bringing the site back online...
            </motion.div>
          )}

          {data.endDate && !countdownDone && (
            <p className="mt-6 text-sm text-gray-500">
              Expected to be live at{" "}
              <span className="text-gray-300">
                {new Date(data.endDate).toLocaleString()}
              </span>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
