import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/header";
export default function Home() {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        {/* <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main> */}
        <p>helo</p>
      </div>
    </div>
  );
}
