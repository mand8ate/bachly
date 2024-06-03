import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || user.isCompany) {
    redirect("/");
  }

  return <div>User dashboard</div>;
}
