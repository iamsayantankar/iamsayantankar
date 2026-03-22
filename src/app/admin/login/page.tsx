"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) { setError("Invalid credentials"); setLoading(false); }
    else router.push("/admin");
  };

  const cls = "w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="w-full max-w-md mx-4 p-8 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">SK</div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your portfolio</p>
        </div>
        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className={cls} placeholder="admin@portfolio.com" required /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className={cls} placeholder="Enter password" required /></div>
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50">{loading ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}
