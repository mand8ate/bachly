import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import Logout from "./Logout";

export default async function Navbar() {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <div className="fixed top-0 left-0 w-full h-[50px] text-primary-foreground bg-muted flex items-center px-4 py-2 justify-evenly">
      <nav className="flex flex-row gap-6">
        <div>LOGO</div>
        <ul className="flex flex-row gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/concept">Concept</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <div className="flex gap-2">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }))}
            href={user.isCompany ? "/company/dashboard" : "/dashboard"}
          >
            Dashboard
          </Link>
          <Logout />
        </div>
      ) : (
        <div className="flex flex-row gap-6 items-center">
          <Link href="/company/register" className="text-sm">
            Register Company
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "sm", variant: "auth" }))}
          >
            Signup
          </Link>
          <Link
            href="/signin"
            className={cn(buttonVariants({ size: "sm", variant: "auth" }))}
          >
            Signin
          </Link>
        </div>
      )}
    </div>
  );
}
