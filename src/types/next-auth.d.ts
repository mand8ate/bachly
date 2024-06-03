import NextAuth from "next-auth";
import type { User } from "next-auth";
import "next-auth/jwt";
import { Prisma } from "@prisma/client";

type UserId = string;
type IsCompany = boolean;

declare module "next-auth" {
  interface JWT {
    id: UserId;
    role: UserRole;
    isCompany: IsCompany;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
      isCompany: IsCompany;
    };
  }
}
