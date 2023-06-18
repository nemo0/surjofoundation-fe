"use client";

import { useState } from "react";
import { useAppProvider } from "@/app/app-provider";
import { DropdownProfileMenu } from "./dropdown-profile";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  const { user } = useAuth();

  return (
    <header className="sticky top-0 bg-slate-900 dark:bg-[#182235] border-b border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div>
            <div>{user && <DropdownProfileMenu user={user} />}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
