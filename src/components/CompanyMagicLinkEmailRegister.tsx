"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyMagicLinkRegisterValidator,
  CompanyMagicLinkRegisterValidatorRequest,
} from "@/lib/validators/company/companyMagicLinkRegister";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CompanyMagicLinkRegister({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyMagicLinkRegisterValidatorRequest>({
    resolver: zodResolver(CompanyMagicLinkRegisterValidator),
  });
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: registerCompany, isPending } =
    trpc.registerCompany.useMutation({
      onSuccess: async (_, variables) => {
        await signIn("email", { email: variables.email, redirect: false });
        toast({
          title: "Company Account Creation",
          description: "Company Account created! Sign in via email",
          variant: "success",
        });

        router.push("/");
      },
      onError: (error) => {
        if (error.data?.code === "CONFLICT") {
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration failed",
            description: "There was an error creating your account",
            variant: "destructive",
          });
        }
      },
    });

  const onSubmit = async (data: CompanyMagicLinkRegisterValidatorRequest) => {
    registerCompany(data);
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 w-full"
      >
        <div>
          <input
            {...register("email")}
            placeholder="Enter your email"
            required
            className={cn(
              "w-full outline-none bg-input rounded-md p-2",
              `${
                errors.email
                  ? "border-red-700 border shadow-red-700/50 shadow-sm"
                  : ""
              }`
            )}
          />
          {errors.email ? (
            <p className="text-sm text-red-700 mt-1">
              Please enter a valid email
            </p>
          ) : (
            ""
          )}
        </div>
        <Button type="submit" className={cn("w-full flex gap-2")}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Send Email
        </Button>
      </form>
    </div>
  );
}
