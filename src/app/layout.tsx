import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthContext from "@/context/AuthContext";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { User } from "@prisma/client";

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
export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = await getCurrentUser();
  if (!user) {
    user = null;
  }
  console.log("user is ", user);
  return (
    <html lang="en">
      <AuthContext>
        <EdgeStoreProvider>
          <body className={`${roboto.className} h-screen   bg-light`}>
            <Navbar user={user} />
            <main className="  h-auto  ">{children}</main>

            <Footer />
          </body>
        </EdgeStoreProvider>
      </AuthContext>
    </html>
  );
}
