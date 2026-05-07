import type { Metadata } from "next";
import OfflineClient from "./OfflineClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are offline.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return <OfflineClient />;
}
