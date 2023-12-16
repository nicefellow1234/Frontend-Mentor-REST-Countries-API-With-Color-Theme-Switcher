import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"]
});

export const metadata: Metadata = {
  title: "Frontend Mentor | REST Countries API With Color Theme Switcher",
  description: "Frontend Mentor | REST Countries API With Color Theme Switcher"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>{children}</body>
    </html>
  );
}
