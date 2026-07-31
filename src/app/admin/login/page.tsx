"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  User,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Change these credentials to your own
  const ADMIN_USERNAME = "Aditya";
  const ADMIN_PASSWORD = "Aditya@5961";

  const handleLogin = () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!username || !password) {
      setErrorMsg("Please enter username and password");
      return;
    }

    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);

      if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        setSuccessMsg("Login successful! Redirecting...");

        // Set a simple session cookie so middleware can protect /admin routes.
        // Expires in 7 days. Not encrypted — fine for a personal admin panel,
        // but don't reuse this pattern for anything handling sensitive data.
        document.cookie = "admin_session=true; path=/; max-age=604800";

        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 800);
      } else {
        setErrorMsg("Invalid username or password");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full bottom-[-120px] right-[-100px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
              <ShieldCheck size={28} className="text-white" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Admin Login
            </h1>

            <p className="text-sm text-white/40 mt-2">
              Login to access dashboard panel
            </p>
          </div>

          {/* Success Message */}
          {successMsg && (
            <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {successMsg}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm text-white/50 mb-2 block">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[56px] rounded-2xl bg-[#0c0c0c] border border-white/10 pl-12 pr-4 text-white outline-none focus:border-white/20 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-white/50 mb-2 block">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full h-[56px] rounded-2xl bg-[#0c0c0c] border border-white/10 pl-12 pr-14 text-white outline-none focus:border-white/20 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[56px] rounded-2xl bg-white text-black font-medium hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
