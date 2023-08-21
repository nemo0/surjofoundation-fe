"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const sendMail = async (
    email: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/password-reset/initiate`,
        {
          email,
        }
      );

      console.log(data);
      setLoading(true);
      toast.success("OTP sent to your email address.");
      setIsMailSent(true);

      console.log("I am here!!");
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      setEmail("");
      setLoading(false);
    }
  };

  const verifyOTPAndResetPassword = async (
    email: string,
    otp: string,
    password: string
  ) => {
    try {
      await axios.post(`${API_BASE_URL}/password-reset/complete`, {
        email,
        otp,
        password,
      });

      setLoading(true);

      toast.success("Password reset successful.");
      setIsMailSent(false);
      setEmail("");
      setOTP("");

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter your email address and we will send you an OTP to reset
          your password.
        </p>
      </div>
      <form
        className="flex flex-col space-y-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (isMailSent) {
            verifyOTPAndResetPassword(email, otp, password);
          } else {
            sendMail(email, e);
          }
        }}
      >
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isMailSent}
          type="email"
        />
        {isMailSent && (
          <>
            <Input placeholder="OTP" onChange={(e) => setOTP(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {!isMailSent && (
          <Button type="submit">
            {loading && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            Send OTP
          </Button>
        )}
        {isMailSent && (
          <Button type="submit">
            {loading && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        )}
      </form>
    </div>
  );
}
