"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { IUserDecoded } from "@/interfaces";

interface AuthContextData {
  user: IUserDecoded | null;
}

const AuthContext = createContext<AuthContextData>({ user: null });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserDecoded | null>(null);

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME); // replace with your token cookie name
    if (token) {
      try {
        const decodedToken = jwt_decode(token as string) as IUserDecoded;
        setUser(decodedToken);
      } catch (error) {
        console.log("Failed to decode token", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
