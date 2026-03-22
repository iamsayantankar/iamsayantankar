"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminProviders from "./providers";
import { HiHome, HiRectangleGroup, HiDocumentText, HiBriefcase, HiCpuChip, HiChatBubbleLeftRight, HiBuildingOffice, HiAcademicCap, HiEnvelope, HiCog6Tooth, HiArrowRightOnRectangle, HiBars3, HiXMark } from "react-icons/hi2";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HiHome },
  { href: "/admin/projects", label: "Projects", icon: HiRectangleGroup },
  { href: "/admin/blogs", label: "Blog", icon: HiDocumentText },
  { href: "/admin/services", label: "Services", icon: HiBriefcase },
  { href: "/admin/skills", label: "Skills", icon: HiCpuChip },
  { href: "/admin/testimonials", label: "Testimonials", icon: HiChatBubbleLeftRight },
  { href: "/admin/experience", label: "Experience", icon: HiBuildingOffice },
  { href: "/admin/education", label: "Education", icon: HiAcademicCap },
  { href: "/admin/messages", label: "Messages", icon: HiEnvelope },
  { href: "/admin/settings", label: "Settings", icon: HiCog6Tooth },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") router.push("/admin/login");
  }, [status, router, pathname]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-gray-950"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">SK</div><span className="text-white font-semibold">Admin</span></div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><HiXMark className="w-6 h-6" /></button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-130px)]">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-primary-500/10 text-primary-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon className="w-5 h-5" />{item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800">
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <HiArrowRightOnRectangle className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"><HiBars3 className="w-6 h-6 text-gray-600 dark:text-gray-300" /></button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{navItems.find(i => i.href === pathname)?.label || "Admin"}</h1>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders><AdminLayoutInner>{children}</AdminLayoutInner></AdminProviders>;
}
