"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { IUserDecoded } from "@/interfaces";

interface AuthContextData {
  user: IUserDecoded | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserDecoded | null>(null);

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME);
    if (token) {
      try {
        const decodedToken = jwt_decode(token as string) as IUserDecoded;
        setUser(decodedToken);
      } catch (error) {
        console.log("Failed to decode token", error);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
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
