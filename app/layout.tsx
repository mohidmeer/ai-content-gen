import type { Metadata } from "next";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='border border-green-700 p-10'
      >
         <p className="text-center">App Root Layout</p>
        {children}
      </body>
    </html>
  );
}
