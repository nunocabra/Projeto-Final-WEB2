"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="gap-4" justify="start">
        <NavbarItem>
          <Link href="/" className="font-bold text-xl text-primary">
            TaskFlow
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {status === "loading" ? (
          <NavbarItem>
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          </NavbarItem>
        ) : session ? (
          <>
            <NavbarItem>
              <Link href="/dashboard">
                <Button color="primary" variant="light">
                  Dashboard
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={session.user?.name || "User"}
                    size="sm"
                    src=""
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Conectado como</p>
                    <p className="text-sm text-gray-500">{session.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
                    Sair
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/auth/login">
                <Button color="primary" variant="light">
                  Entrar
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/auth/register">
                <Button color="primary" variant="solid">
                  Criar Conta
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
}



