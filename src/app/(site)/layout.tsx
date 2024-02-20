import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "ExploreX",
  description: "A Travel Blog made with nextjs",
};
const User = {
  name: "kanwar",
  email: "kan@gmail.com",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} overflow-x-hidden bg-light`}>
        <Navbar user={null} />
        {children}
      </body>
    </html>
  );
}