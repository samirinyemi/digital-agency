import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXIOM Studio | Digital Design Agency",
  description: "We craft digital experiences that define brands and move people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
