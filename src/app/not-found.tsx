import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Página não encontrada</h2>
          <p className="text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button as={Link} href="/" color="primary" variant="solid">
            Voltar para Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}



