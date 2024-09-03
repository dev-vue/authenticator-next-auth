import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviders from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authenticator",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
