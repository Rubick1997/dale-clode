import type { Metadata } from "next";
import "./globals.css";
import { ClientProvider, Header, PromptInput } from "@/components";

export const metadata: Metadata = {
  title: "Rubick1997 AI art gallery 2.0",
  description: "Made by Rubick1997",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
