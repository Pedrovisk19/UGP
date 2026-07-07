"use client";

import { signInWithEmail } from "@/actions/auth.actions";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  unauthenticated:
    "Você precisa estar autenticado para acessar esta página. Faça login para continuar.",
  session_timeout:
    "Sua sessão expirou ou demorou demais para carregar. Faça login novamente.",
  session_error:
    "Houve um problema ao validar sua sessão. Faça login novamente.",
  no_session: "Não há sessão ativa. Faça login para continuar.",
  profile_missing:
    "Não foi possível carregar seu perfil. Faça login novamente.",
};

const DEFAULT_ERROR = "Algo deu errado. Tente fazer login novamente.";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("error");
    if (!code) return;
    setUrlError(ERROR_MESSAGES[code] ?? DEFAULT_ERROR);
  }, []);
  
  async function handleSubmit() {
    setError(null);
    setLoading(true);
    const res = await signInWithEmail(email, password);
    setLoading(false);
    if (res && res.error) {
      setError(res.error);
    }
  }

  const displayedError = urlError ?? error;

  return (
    <AuthShell title="Entrar na UGP" subtitle="Acesse sua conta para continuar">
      <div className="space-y-4">

        {displayedError && (
          <div className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
            {displayedError}
          </div>
        )}

        <form className="space-y-3">
          <Input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GraduationCap className="h-4 w-4" />
            )}
            Entrar na Universidade
          </Button>
        </form>

        <div className="flex items-center justify-between text-[12px] text-[hsl(var(--muted-foreground))]">
          <Link
            href="/forgot-password"
            className="hover:text-[hsl(var(--foreground))]"
          >
            Esqueci a senha
          </Link>
          <Link
            href="/register"
            className="hover:text-[hsl(var(--foreground))]"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
