"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (signUpError) {
          setError(signUpError.message || "Failed to sign up");
          return;
        }
        if (data?.user) {
          // Promote to admin
          await fetch("/api/admin/promote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data.user.id }),
          });
          router.push("/admin");
          router.refresh();
        }
      } else {
        const { data, error: signInError } = await authClient.signIn.email({
          email,
          password,
        });
        if (signInError) {
          setError("Invalid email or password");
          return;
        }
        if (data?.user) {
          router.push("/admin");
          router.refresh();
        }
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-navy-900">
            <span className="font-serif">Pristine</span>
            <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-sm text-navy-500 mt-2">
            {mode === "signin" ? "Sign in to the dashboard" : "Create admin account"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-navy-100 p-8 space-y-4"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="text-sm font-medium text-navy-900/80 block mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
                placeholder="Admin"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-navy-900/80 block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="admin@pristineclean.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-navy-900/80 block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </Button>

          <p className="text-center text-sm text-navy-500">
            {mode === "signin" ? (
              <>
                No account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
