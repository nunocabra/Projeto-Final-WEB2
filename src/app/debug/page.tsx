"use client";

import { useSession } from "next-auth/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function DebugPage() {
  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Debug - Informações de Sessão</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Status da Sessão:</h2>
            <p className="text-lg">
              {status === "loading" && "⏳ Carregando..."}
              {status === "authenticated" && "✅ Autenticado"}
              {status === "unauthenticated" && "❌ Não autenticado"}
            </p>
          </div>

          {session && (
            <div>
              <h2 className="font-semibold mb-2">Dados da Sessão:</h2>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          )}

          {!session && status === "unauthenticated" && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
              <p className="font-semibold">⚠️ Você não está autenticado</p>
              <p className="text-sm mt-2">
                Faça login em <a href="/auth/login" className="text-primary underline">/auth/login</a>
              </p>
            </div>
          )}

          <div>
            <h2 className="font-semibold mb-2">Variáveis de Ambiente:</h2>
            <div className="space-y-2 text-sm">
              <p>
                NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Não configurado (client)"}
              </p>
              <p className="text-gray-500">
                Nota: Variáveis de ambiente do servidor não aparecem aqui
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


