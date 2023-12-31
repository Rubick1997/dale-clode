import type { Metadata } from "next";
import "./globals.css";
import { Header, PromptInput } from "@/components";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        <PromptInput />
        {children}
      </body>
    </html>
  );
}
