import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { NextAuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "./resend";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
        session.user.role = token.role;
        session.user.isCompany = token.isCompany as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      return {
        id: dbUser?.id,
        name: dbUser?.name,
        email: dbUser?.email,
        image: dbUser?.image,
        role: dbUser?.role,
        isCompany: dbUser?.isCompany,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
