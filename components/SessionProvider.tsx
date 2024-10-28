"use client";

import { createContext, ReactNode, useContext } from "react";
import type { Session } from "next-auth";

const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

interface SessionProviderProps {
  session: Session | null;
  children: ReactNode;
}

// Create the provider component
export function SessionProvider({ session, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}