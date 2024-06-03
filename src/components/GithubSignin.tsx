"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function GithubSignin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signinWithGithub = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { redirect: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Github",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={signinWithGithub}
      className={cn("w-full flex gap-2")}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      Github
    </Button>
  );
}
