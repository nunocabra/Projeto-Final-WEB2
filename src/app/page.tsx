import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Zap
} from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Gerencie suas tarefas de forma inteligente
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  TaskFlow
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                A plataforma completa para gerenciar suas tarefas e projetos. 
                <span className="block mt-2 text-lg">
                  Organize, priorize e conclua mais em menos tempo.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                as={Link}
                href="/auth/register"
                color="primary"
                size="lg"
                className="min-w-[200px] font-semibold text-lg px-8 py-6"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Começar Agora
              </Button>
              <Button
                as={Link}
                href="/auth/login"
                color="default"
                size="lg"
                variant="bordered"
                className="min-w-[200px] font-semibold text-lg px-8 py-6"
              >
                Entrar
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tarefas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-content1/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Por que escolher o <span className="text-primary">TaskFlow</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tudo que você precisa para ser mais produtivo e organizado
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:scale-105 transition-transform duration-300 border-2 hover:border-primary/50">
                <CardHeader className="flex flex-col items-center pb-0 pt-8">
                  <div className="p-4 rounded-2xl bg-blue-500/10 mb-4">
                    <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Organize</h3>
                </CardHeader>
                <CardBody className="text-center pb-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Organize suas tarefas em projetos e mantenha tudo em ordem. 
                    Categorize por prioridade e status para máxima eficiência.
                  </p>
                </CardBody>
              </Card>

              <Card className="hover:scale-105 transition-transform duration-300 border-2 hover:border-primary/50">
                <CardHeader className="flex flex-col items-center pb-0 pt-8">
                  <div className="p-4 rounded-2xl bg-purple-500/10 mb-4">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Colabore</h3>
                </CardHeader>
                <CardBody className="text-center pb-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Trabalhe em equipe e compartilhe suas tarefas. 
                    Mantenha todos na mesma página com atualizações em tempo real.
                  </p>
                </CardBody>
              </Card>

              <Card className="hover:scale-105 transition-transform duration-300 border-2 hover:border-primary/50">
                <CardHeader className="flex flex-col items-center pb-0 pt-8">
                  <div className="p-4 rounded-2xl bg-pink-500/10 mb-4">
                    <TrendingUp className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Produza</h3>
                </CardHeader>
                <CardBody className="text-center pb-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Aumente sua produtividade com ferramentas inteligentes. 
                    Filtros avançados e estatísticas para otimizar seu fluxo de trabalho.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Comece agora, é grátis!</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Pronto para aumentar sua produtividade?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que já estão organizando suas vidas com o TaskFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                as={Link}
                href="/auth/register"
                color="primary"
                size="lg"
                className="min-w-[200px] font-semibold text-lg px-8 py-6"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Criar Conta Grátis
              </Button>
              <Button
                as={Link}
                href="/auth/login"
                color="default"
                size="lg"
                variant="bordered"
                className="min-w-[200px] font-semibold text-lg px-8 py-6"
              >
                Já tenho conta
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


