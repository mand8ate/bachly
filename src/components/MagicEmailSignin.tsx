"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MagicLinkSigninValidator,
  MagicLinkSigninValidatorRequest,
} from "@/lib/validators/magicLinkSignin";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function EmailSignup({
  authFunction,
}: {
  authFunction: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MagicLinkSigninValidatorRequest>({
    resolver: zodResolver(MagicLinkSigninValidator),
  });

  const onSubmit = async (data: MagicLinkSigninValidatorRequest) => {
    setIsLoading(true);
    try {
      await signIn("email", {
        email: data.email,
        redirect: false,
      });
      toast({
        title: "Success",
        description: "Email sent! Check your inbox",
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 w-full"
      >
        <div>
          {" "}
          <input
            {...register("email")}
            placeholder="Enter your email"
            required
            className={cn(
              "w-full outline-none bg-input rounded-md p-2",
              `${
                errors.email
                  ? "border-destructive border shadow-distructive/50 shadow-sm"
                  : ""
              }`
            )}
          />
          {errors.email ? (
            <p className="text-sm text-destructive mt-1">
              Please enter a valid email
            </p>
          ) : (
            ""
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn("w-full flex gap-2")}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Send {authFunction} Email
        </Button>
      </form>
    </div>
  );
}
