import { CreditCard, LifeBuoy, LogOut, User } from "lucide-react";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUserDecoded } from "@/interfaces";
import { setCookie } from "cookies-next";
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";

export function DropdownProfileMenu({ user }: { user: IUserDecoded }) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center">
          <LifeBuoy className="h-4 w-4 text-white mr-2" />
          <span className="text-sm font-medium text-white">
            {user.centerId}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Change Password</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCookie(AUTH_COOKIE_NAME, "", {
              maxAge: -1,
              path: "/",
            });

            logout();
            router.push("/login");
          }}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
