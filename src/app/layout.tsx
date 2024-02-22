import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthContext from "@/context/AuthContext";
import { getCurrentUser } from "@/actions/getCurrentUser";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "ExploreX",
  description: "A Travel Blog made with nextjs",
};
// const User = {
//   name: "kanwar",
//   email: "kan@gmail.com",
// };
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${roboto.className} overflow-x-hidden bg-light`}>
          <Navbar user={user as any} />
          {children}
          <Footer />
        </body>
      </AuthContext>
    </html>
  );
}
