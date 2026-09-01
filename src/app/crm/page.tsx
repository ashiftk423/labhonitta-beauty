"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { GALLERY_SLOTS } from "@/content/media";
import { verifyCrmLogin } from "@/lib/crm-auth";

const SESSION_KEY = "labhonitta-crm-session";

type Session = {
  email: string;
  name: string;
  role: "superadmin" | "editor";
  loggedInAt: string;
};

export default function CrmPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw) as Session);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = (e: FormEvent) => {
    e.preventDefault();
    const user = verifyCrmLogin(email, password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    const next: Session = {
      email: user.email,
      name: user.name,
      role: user.role,
      loggedInAt: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
    setError("");
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
    setPassword("");
  };

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg text-cream">
        <p className="text-sm text-muted">Loading…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-cream">
        <form
          onSubmit={login}
          className="glass w-full max-w-md rounded-3xl p-8 shadow-2xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-rose/80">
            Labhonitta CRM
          </p>
          <h1 className="mt-2 font-display text-3xl font-light">Sign in</h1>
          <p className="mt-2 text-sm text-muted">
            MVP login — images &amp; captions are still edited via folders for
            now. Backend comes later.
          </p>

          <label className="mt-6 block text-xs uppercase tracking-widest text-muted-soft">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gold/20 bg-bg-soft px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
              autoComplete="username"
            />
          </label>

          <label className="mt-4 block text-xs uppercase tracking-widest text-muted-soft">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gold/20 bg-bg-soft px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="mt-3 text-sm text-rose" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-rosegold to-rose py-3 text-sm font-medium text-ink"
          >
            Enter CRM
          </button>

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-muted hover:text-gold"
          >
            ← Back to website
          </Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-cream">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose/80">
              CRM · MVP stub
            </p>
            <h1 className="mt-2 font-display text-4xl font-light">
              Hello, {session.name}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {session.email} · {session.role}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-full border border-gold/30 px-4 py-2 text-sm hover:border-gold/60"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-gradient-to-r from-rosegold to-rose px-4 py-2 text-sm font-medium text-ink"
            >
              Log out
            </button>
          </div>
        </div>

        <section className="glass mt-10 rounded-3xl p-6">
          <h2 className="font-display text-2xl">Image folders (no server yet)</h2>
          <p className="mt-2 text-sm text-muted">
            Drop WebP/JPG files into these folders, then list them in{" "}
            <code className="text-gold">src/content/media.ts</code>. When the
            Docker/.NET backend is ready (planned under{" "}
            <code className="text-gold">c:\labhinitta thrissur</code>), this
            panel will upload &amp; audit edits.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <code className="text-gold">public/images/bridal/</code> — wheel
              looks (unlimited)
            </li>
            <li>
              <code className="text-gold">public/images/hair/</code> — hair
              styles (unlimited)
            </li>
            <li>
              <code className="text-gold">public/images/gallery/slot-1…6/</code>{" "}
              — one folder per fixed gallery cell
            </li>
          </ul>
        </section>

        <section className="glass mt-6 rounded-3xl p-6">
          <h2 className="font-display text-2xl">Gallery slot sizes</h2>
          <p className="mt-2 text-sm text-muted">
            Each container is a different shape — crop to these sizes before
            upload.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-xs uppercase tracking-wider text-muted-soft">
                  <th className="py-2 pr-3">Slot</th>
                  <th className="py-2 pr-3">Caption</th>
                  <th className="py-2 pr-3">Shape</th>
                  <th className="py-2 pr-3">Recommend</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {GALLERY_SLOTS.map((s) => (
                  <tr key={s.id} className="border-b border-white/5">
                    <td className="py-3 pr-3 text-gold">{s.id}</td>
                    <td className="py-3 pr-3">{s.caption}</td>
                    <td className="py-3 pr-3">{s.sizeHint.aspect}</td>
                    <td className="py-3 pr-3">{s.sizeHint.recommendPx}</td>
                    <td className="py-3 text-muted">{s.sizeHint.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {session.role === "superadmin" && (
          <section className="glass mt-6 rounded-3xl p-6">
            <h2 className="font-display text-2xl">Manage users</h2>
            <p className="mt-2 text-sm text-muted">
              Superadmin-only. User add / edit / remove + change audit log will
              live here once the PostgreSQL + .NET API is wired. For now only
              your hardcoded account can sign in.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
