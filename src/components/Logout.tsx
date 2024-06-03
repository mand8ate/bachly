"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Logout() {
  const signout = async () => {
    await signOut({ callbackUrl: "http://localhost:3000/signin" });
  };

  return <Button onClick={() => signout()}>Signout</Button>;
}
