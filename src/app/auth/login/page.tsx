"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Conta criada com sucesso! Faça login para continuar.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Normalizar email antes de enviar
      const normalizedEmail = email.toLowerCase().trim();

      const result = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Mostrar mensagem de erro mais específica
        const errorMessage = result.error;
        if (errorMessage.includes("Email ou senha incorretos")) {
          setError("Email ou senha incorretos. Verifique suas credenciais.");
        } else if (errorMessage.includes("Usuário não encontrado")) {
          setError("Usuário não encontrado. Verifique o email digitado.");
        } else {
          setError(errorMessage || "Erro ao fazer login. Tente novamente.");
        }
      } else if (result?.ok) {
        // Aguardar um pouco para garantir que a sessão foi criada
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-sm text-gray-500">
            Acesse sua conta para gerenciar suas tarefas
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <div className="p-3 bg-success-50 text-success text-sm rounded-lg">
                {success}
              </div>
            )}
            {error && (
              <div className="p-3 bg-danger-50 text-danger text-sm rounded-lg">
                {error}
              </div>
            )}
            <Input
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              autoFocus
            />
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Entrar"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Não tem uma conta? </span>
              <Link href="/auth/register" className="text-primary">
                Criar conta
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Carregando..." />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

