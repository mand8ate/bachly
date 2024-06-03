import MagicEmailSignin from "./MagicEmailSignin";
import GithubSignin from "./GithubSignin";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Separator } from "./ui/separator";

export default function UserAuth({ authFunction }: { authFunction: string }) {
  return (
    <div className="flex flex-col h-full justify-center gap-2 p-8">
      <MagicEmailSignin authFunction={authFunction} />
      <Separator />
      <GithubSignin />
    </div>
  );
}
