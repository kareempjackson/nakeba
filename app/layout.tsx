import type { Metadata } from "next";
import { hostGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nakeba Mason",
    template: "%s — Nakeba Mason",
  },
  description:
    "Fresh, creative and approachable — the Nakeba Mason brand identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} h-full antialiased`}>
      {/* No flex on body — it would fight the sticky footer reveal. */}
      <body className="min-h-full">{children}</body>
    </html>
  );
}
