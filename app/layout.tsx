import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useContext } from "react";
import { auth } from "@/auth";
import { SessionProvider } from "@/components/SessionProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const authSession = await auth();

  return (
    <html lang="en">
      <body className="overflow-x-hidden ">
        <SessionProvider session={authSession}  > 
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />

            {children}
          </ThemeProvider>
          </SessionProvider>
      </body>
    </html>
  );
}
