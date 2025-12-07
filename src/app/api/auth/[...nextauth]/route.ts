import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Verificar se NEXTAUTH_SECRET está configurado
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("⚠️ NEXTAUTH_SECRET não está configurado! A autenticação pode não funcionar corretamente.");
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        try {
          await connectDB();
          
          // Normalizar email (lowercase e trim)
          const normalizedEmail = credentials.email.toLowerCase().trim();
          
          const user = await User.findOne({ email: normalizedEmail });

          if (!user) {
            console.error("Usuário não encontrado para email:", normalizedEmail);
            throw new Error("Email ou senha incorretos");
          }

          if (!user.password) {
            console.error("Usuário sem senha no banco:", user._id);
            throw new Error("Erro na autenticação. Contate o suporte.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.error("Senha inválida para usuário:", normalizedEmail);
            throw new Error("Email ou senha incorretos");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error: any) {
          console.error("Erro no authorize:", error);
          // Não expor detalhes do erro para segurança
          if (error.message.includes("Email ou senha incorretos") || 
              error.message.includes("Email e senha são obrigatórios")) {
            throw error;
          }
          throw new Error("Erro ao fazer login. Tente novamente.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


