import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Anonymous Feedback",
  description: "Send Anonymous Messages To Anyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <AuthProvider>
        <body>
            {/* <Navbar/> */}
          {children}
          <Toaster/>
        </body>
       </AuthProvider>
    </html>
  );
}
