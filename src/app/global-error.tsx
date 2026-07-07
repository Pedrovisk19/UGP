"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          background: "var(--canvas, #0d0d12)",
          color: "var(--text-primary, #f4f4f5)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Algo deu errado
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary, #a1a1aa)",
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            Ocorreu um erro inesperado ao carregar a página. Você pode tentar
            novamente; se persistir, recarregue a página.
          </p>

          {error?.digest && (
            <p
              style={{
                fontSize: "11px",
                fontFamily: "ui-monospace, monospace",
                color: "var(--text-muted, #52525b)",
                marginTop: 12,
                wordBreak: "break-all",
              }}
            >
              {error.digest}
            </p>
          )}

          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "0",
                borderRadius: 6,
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              style={{
                background: "transparent",
                color: "var(--text-secondary, #a1a1aa)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Voltar ao início
            </Link>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && error?.message && (
          <pre
            style={{
              marginTop: 32,
              maxWidth: "100%",
              overflowX: "auto",
              padding: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "ui-monospace, monospace",
              color: "#fca5a5",
              textAlign: "left",
            }}
          >
            {error.message}
            {error.stack ? `\n\n${error.stack}` : ""}
          </pre>
        )}
      </body>
    </html>
  );
}
