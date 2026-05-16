import { useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

const KEY = "vf_admin_ok";

export function useAdminAuth() {
  const [ok, setOk] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setOk(typeof window !== "undefined" && localStorage.getItem(KEY) === "1");
    setChecked(true);
  }, []);
  return {
    isAuthed: ok,
    checked,
    login: async (password: string) => {
      const { data } = await (supabase as any)
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      if (data && data.value === password) {
        localStorage.setItem(KEY, "1");
        setOk(true);
        return true;
      }
      return false;
    },
    logout: () => {
      localStorage.removeItem(KEY);
      setOk(false);
    },
  };
}

export function AdminGate({ children }: { children: ReactNode }) {
  const { isAuthed, checked, login } = useAdminAuth();
  const [pwd, setPwd] = useState("");
  const [shake, setShake] = useState(false);
  const [err, setErr] = useState("");

  if (!checked) return null;
  if (isAuthed) return <>{children}</>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const success = await login(pwd);
    if (!success) {
      setErr("Wrong password");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand p-4">
      <form
        onSubmit={submit}
        className={`w-full max-w-sm rounded-2xl bg-burgundy border border-gold p-8 ${shake ? "animate-shake" : ""}`}
      >
        <h1 className="font-serif text-3xl text-gold text-center mb-6">Admin Login</h1>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-3 mb-3 focus:outline-none focus:border-gold"
          autoFocus
        />
        {err && <p className="text-red-400 text-sm text-center mb-3">{err}</p>}
        <button className="w-full h-12 rounded-lg bg-gold text-[#080808] font-bold">Sign in</button>
      </form>
    </div>
  );
}
