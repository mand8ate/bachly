import UserAuth from "@/components/UserAuth";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  const user = session?.user;

  if (session && user) {
    if (!user.isCompany) {
      redirect("/dashboard");
    } else if (user.isCompany) {
      redirect("/company/dashboard");
    }
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col border rounded-md shadow-md w-[300px] h-[400px]">
        <div className="w-full flex rounded-t-md justify-center p-8 relative bg-gradient-to-r from-strongblue-foreground to-strongblue">
          <h1 className="text-background text-xl font-bold">Signup</h1>
          <div className="absolute rounded-full bg-white bottom-0 transform translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10">
            <Image src="/logo.svg" fill alt="logo" />
          </div>
        </div>

        <UserAuth authFunction="signup" />
      </div>
    </div>
  );
}
