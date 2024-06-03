import Image from "next/image";
import CompanyMagicLinkEmailRegister from "./CompanyMagicLinkEmailRegister";

export default function CompanyAuth() {
  return (
    <div className="flex flex-col border rounded-md shadow-md w-[300px] h-[400px]">
      <div className="w-full flex rounded-t-md justify-center p-8 relative bg-gradient-to-r from-strongblue-foreground to-strongblue">
        <h1 className="text-background text-xl font-bold">Register Company</h1>
        <div className="absolute rounded-full bg-white bottom-0 transform translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10">
          <Image src="/logo.svg" fill alt="logo" />
        </div>
      </div>
      <div className="flex flex-col h-full justify-center p-8 gap-2">
        <CompanyMagicLinkEmailRegister />
        <p className="text-sm">
          Register a company user. After logging in via the email link, you can
          create your company profile.
        </p>
      </div>
    </div>
  );
}
