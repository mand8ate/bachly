import { z } from "zod";

export const MagicLinkSigninValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type MagicLinkSigninValidatorRequest = z.infer<
  typeof MagicLinkSigninValidator
>;
