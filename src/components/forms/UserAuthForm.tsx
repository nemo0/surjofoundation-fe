"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImSpinner2 } from "react-icons/im";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { API_BASE_URL, AUTH_COOKIE_NAME } from "@/lib/config";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorStatus, setErrorStatus] = React.useState<number>();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      setIsError(false);
      setCookie(AUTH_COOKIE_NAME, data.data.access_token, {
        maxAge: 3 * 24 * 60 * 60, // 3 days
        path: "/",
      });

      router.push("/");
    } catch (error: any) {
      setIsError(true);
      if (error.response) {
        setErrorStatus(error.response.status);
      }

      setIsLoading(false);
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await handleLogin();

    setIsLoading(false);
  }

  React.useEffect(() => {
    const isCookie = getCookie(AUTH_COOKIE_NAME);
    if (isCookie) {
      router.push("/");
    }
  }, [router, AUTH_COOKIE_NAME]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {isError && errorStatus === 406 && (
            <Alert variant="destructive">
              <AlertTitle>Error logging in!</AlertTitle>
              <AlertDescription>
                You have entered an invalid email or password.
              </AlertDescription>
            </Alert>
          )}
          {isError && errorStatus !== 406 && (
            <Alert variant="destructive">
              <AlertTitle>Error logging in!</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-1 pb-2">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="your_password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
