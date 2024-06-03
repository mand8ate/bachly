import CompanyAuth from "@/components/CompanyAuth";
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
    <div className="flex flex-col gap-2 items-center h-screen justify-center pt-12">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-accent font-bold text-3xl">Register Company</h1>
        <h3 className="text-primary font-semibold text-xl">
          Creating a new user and verify your email address. We will send you a
          link to finish signing up your company information.
        </h3>
      </div>
      <CompanyAuth />
    </div>
  );
}
