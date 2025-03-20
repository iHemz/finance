import { Providers } from "@/app/providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucid Dreams",
  description: "Financial Technology application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <main className={inter.variable}>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
