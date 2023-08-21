import { Metadata } from "next";

import { UserAuthForm } from "@/components/forms/UserAuthForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <UserAuthForm />
    </>
  );
}
