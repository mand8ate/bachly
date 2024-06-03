import { CompanyMagicLinkRegisterValidator } from "@/lib/validators/company/companyMagicLinkRegister";
import { publicProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  registerCompany: publicProcedure
    .input(CompanyMagicLinkRegisterValidator)
    .mutation(async ({ input }) => {
      const { email } = input;

      const existingUser = await db.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists",
        });
      }

      const user = await db.user.create({
        data: {
          email,
          isCompany: true,
        },
      });

      return user;
    }),
});

export type AppRouter = typeof appRouter;
