// Layout do Dashboard - Proteção feita no client side
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A proteção de rota é feita no componente DashboardPage (client component)
  // Isso evita problemas com a sessão não estar disponível no servidor
  return <>{children}</>;
}


