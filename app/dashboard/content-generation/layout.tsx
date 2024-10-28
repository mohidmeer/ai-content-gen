"use client";
import { ContentProvider } from "@/context/ContentContext";

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
