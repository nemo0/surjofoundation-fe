import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Command } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/forms/UserAuthForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container h-screen flex-col items-center justify-center md:grid lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to continue
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
