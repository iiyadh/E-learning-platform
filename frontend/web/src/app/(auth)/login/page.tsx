"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Video,
  Award,
  Users,
  Quote,
  Sun,
  Moon,
} from "lucide-react";
import { useThemeStore } from "@/store/theme";

function MarginNote({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] ${
        light ? "text-white/60" : "text-primary dark:text-[#7FBFA8]"
      }`}
    >
      <span
        className={`h-px w-5 ${light ? "bg-white/40" : "bg-primary dark:bg-[#7FBFA8]"}`}
      />
      {children}
    </span>
  );
}

const PANEL_FEATURES = [
  { icon: Video, text: "500+ expert-led courses" },
  { icon: Award, text: "Shareable completion certificates" },
  { icon: Users, text: "10,000+ active learners" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground antialiased">

      {/* ── Left decorative panel ── */}
      <aside className="relative hidden flex-col justify-between overflow-hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#2D5F4F] to-[#1F4438] px-12 py-10">
        {/* ruled-paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, rgba(250,247,240,1) 35px, rgba(250,247,240,1) 36px)",
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
              <BookOpen size={18} />
            </span>
            <span
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Eduline
            </span>
          </Link>
        </div>

        {/* Middle content */}
        <div className="relative z-10">
          <MarginNote light>Welcome back</MarginNote>
          <h2
            className="mt-4 text-3xl font-semibold leading-snug text-white sm:text-4xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Continue where<br />you left off.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Your courses, certificates, and progress are all here waiting for you.
          </p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {PANEL_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Icon size={15} />
                </span>
                <span className="text-sm text-white/80">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
          <Quote size={16} className="text-[#E8633A]" />
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            &ldquo;The pacing here made learning feel possible. I shipped my first freelance project in four months.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#2D5F4F] font-mono text-xs font-semibold text-white">
              AW
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Amara Whitfield</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                Frontend Developer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <main className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          {/* Mobile-only logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen size={16} />
            </span>
            <span
              className="text-base font-semibold text-foreground"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Eduline
            </span>
          </Link>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="hidden text-sm text-muted-foreground sm:block">
              No account yet?
            </span>
            <Link
              href="/register"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:scale-105 hover:brightness-110"
            >
              Register
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <MarginNote>Sign in</MarginNote>
            <h1
              className="mt-3 text-3xl text-foreground sm:text-4xl"
              style={{ fontFamily: "Fraunces, serif", fontWeight: 600 }}
            >
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enter your credentials to access your learning dashboard.
            </p>

            {/* Form card */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-xs text-primary transition-colors hover:underline dark:text-[#7FBFA8]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">Keep me signed in</span>
                </label>

                {/* Dashed divider — index-card motif */}
                <div className="border-t border-dashed border-border" />

                {/* Submit */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110"
                >
                  Sign in to Eduline
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary transition-colors hover:underline dark:text-[#7FBFA8]"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
