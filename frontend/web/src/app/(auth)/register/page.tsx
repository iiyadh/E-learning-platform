"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser, type RegisterRequest } from "@/shared/api/auth";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  AtSign,
  CheckCircle2,
  Sun,
  Moon,
  GraduationCap,
  BookMarked,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { useThemeStore } from "@/store/theme";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required").max(150),
  email: z.string().email("Invalid email"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

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

function PasswordStrength({ value }: { value: string }) {
  const score = !value
    ? 0
    : value.length < 6
    ? 1
    : value.length < 8
    ? 2
    : value.length >= 8 && /[A-Z]/.test(value) && /[0-9!@#$%^&*]/.test(value)
    ? 4
    : 3;

  const segmentColors = [
    "bg-border",
    "bg-[#E8633A]",
    "bg-yellow-400",
    "bg-primary/60",
    "bg-primary",
  ];
  const labels = ["", "Too short", "Weak", "Good", "Strong"];

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              score >= i ? segmentColors[score] : "bg-border"
            }`}
          />
        ))}
      </div>
      {score > 0 && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {labels[score]}
        </span>
      )}
    </div>
  );
}

const PANEL_FEATURES = [
  { icon: GraduationCap, text: "Free to start — no credit card" },
  { icon: BookMarked, text: "Progress saved across all devices" },
  { icon: Trophy, text: "Earn certificates you can share" },
  { icon: TrendingUp, text: "Track your growth over time" },
];

const PANEL_STATS = [
  { value: "10K+", label: "Students" },
  { value: "500+", label: "Courses" },
  { value: "95%", label: "Satisfaction" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useThemeStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setServerError(null);
      await registerUser(data);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setServerError(axiosErr.response?.data?.message || "Registration failed");
      } else {
        setServerError("Registration failed");
      }
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background font-sans antialiased">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 size={32} className="text-primary" />
          </div>
          <h2
            className="text-2xl text-foreground"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 600 }}
          >
            Account created!
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Welcome to Eduline. Redirecting you to sign in&hellip;
          </p>
        </div>
      </div>
    );
  }

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
          <MarginNote light>Start learning</MarginNote>
          <h2
            className="mt-4 text-3xl font-semibold leading-snug text-white sm:text-4xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Your first lesson<br />is one click away.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Create a free account and start building real, provable skills today.
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

        {/* Stats strip */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {PANEL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/10 p-3 text-center backdrop-blur-sm"
            >
              <p
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {stat.value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
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
              Have an account?
            </span>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-card"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <MarginNote>Create account</MarginNote>
            <h1
              className="mt-3 text-3xl text-foreground sm:text-4xl"
              style={{ fontFamily: "Fraunces, serif", fontWeight: 600 }}
            >
              Start your journey
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free forever on the basics. No credit card required.
            </p>

            {/* Form card */}
            <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="fullName"
                      {...register("fullName")}
                      type="text"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      className={`w-full rounded-lg border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.fullName
                          ? "border-[#E8633A] focus:border-[#E8633A]"
                          : "border-border focus:border-primary"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="font-mono text-[10px] text-[#E8633A]">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="ada@example.com"
                      className={`w-full rounded-lg border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.email
                          ? "border-[#E8633A] focus:border-[#E8633A]"
                          : "border-border focus:border-primary"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="font-mono text-[10px] text-[#E8633A]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="username"
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <AtSign
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="username"
                      {...register("username")}
                      type="text"
                      autoComplete="username"
                      placeholder="ada_lovelace"
                      className={`w-full rounded-lg border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.username
                          ? "border-[#E8633A] focus:border-[#E8633A]"
                          : "border-border focus:border-primary"
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="font-mono text-[10px] text-[#E8633A]">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="password"
                      {...register("password", {
                        onChange: (e) => setPasswordValue(e.target.value),
                      })}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      className={`w-full rounded-lg border bg-background py-2.5 pl-9 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.password
                          ? "border-[#E8633A] focus:border-[#E8633A]"
                          : "border-border focus:border-primary"
                      }`}
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
                  <PasswordStrength value={passwordValue} />
                  {errors.password && (
                    <p className="font-mono text-[10px] text-[#E8633A]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div className="rounded-lg border border-[#E8633A]/30 bg-[#E8633A]/10 px-4 py-3">
                    <p className="text-sm text-[#E8633A]">{serverError}</p>
                  </div>
                )}

                {/* Dashed divider — index-card motif */}
                <div className="border-t border-dashed border-border" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Creating account&hellip;
                    </>
                  ) : (
                    <>
                      Create free account
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  By registering you agree to our{" "}
                  <Link
                    href="#"
                    className="text-primary hover:underline dark:text-[#7FBFA8]"
                  >
                    Terms
                  </Link>{" "}
                  &amp;{" "}
                  <Link
                    href="#"
                    className="text-primary hover:underline dark:text-[#7FBFA8]"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>

            <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary transition-colors hover:underline dark:text-[#7FBFA8]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
