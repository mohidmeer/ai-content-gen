"use client";
import { ContentProvider } from "@/context/contentContext";
import { Children } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ContentProvider>
    {children}
   </ContentProvider>
  );
}
