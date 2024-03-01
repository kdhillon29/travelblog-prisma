"use client";
import Link from "next/link";
import Button from "../ui/Button";
import Route from "../ui/Route";
import { navLinks } from "@/constants";
import MobileMenu from "./MobileMenu";
import useMenuActive from "@/hooks/useMenuActive";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

interface NavbarProps {
  user: any | null;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { data: session, status } = useSession();
  // console.log("session in navbar ", session);
  let { user: userData } = props;
  if (!userData && session?.user) {
    userData = session.user;
  }
  // console.log("user is", userData);
  const [isScrolling, setIsScrolling] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={clsx(
        "py-4 w-full",
        isScrolling ? "fixed top-0 bg-white shadow-lg z-10" : "relative"
      )}
    >
      <div
        className={clsx(
          "w-[95%] mx-auto max-w-[1450px] flex  items-center justify-between  border-b border-gray-100",
          isScrolling && "pb-0 border-none",
          !isScrolling && "pb-5"
        )}
      >
        <div className="flex-1">
          <Link href={"/"}>
            <h1 className="text-3xl font-extrabold text-secondary">
              Explore
              <span className="text-primary">X</span>
            </h1>
          </Link>
        </div>

        <ul className="flex items-center justify-center gap-16 flex-2 max-md:hidden">
          {navLinks.map((link, index) => {
            // const isActive = useMenuActive(link.route);

            return (
              <li key={index}>
                <Route route={link.route} label={link.label} />
              </li>
            );
          })}
        </ul>

        {!userData && (
          <div className="flex gap-5 flex-1 justify-end max-md:hidden">
            <Button
              text="Log In"
              onClick={() => router.push("/access")}
              aria="Log in button"
            />
            <Button
              text="Sign Up"
              onClick={() => router.push("/access/register")}
              aria="Sign up button"
            />
          </div>
        )}

        {userData && (
          <div className="flex gap-5 items-center flex-1 justify-end max-md:hidden">
            <h1>{userData.name?.split(" ")[0]}</h1>
            <Image
              src={(userData.image as string) || "/assets/avatar.jpg"}
              width={30}
              height={30}
              className="rounded-full border-4 border-primary cursor-pointer"
              alt={`Image of ${userData.name}`}
              onClick={() => setOpenUserMenu(!openUserMenu)}
            />
          </div>
        )}

        {openUserMenu && (
          <ul className="z-10 absolute right-8  top-[50px] w-48 bg-light flex flex-col text-center gap-2 shadow-md rounded-md p-2">
            <span
              onClick={() => setOpenUserMenu(false)}
              className="ml-auto px-1 cursor-pointer bg-white rounded-full"
            >
              X
            </span>
            <Link href="/create" onClick={() => setOpenUserMenu(false)}>
              <li className="">Create a post</li>
            </Link>
            <Link href="/userposts" onClick={() => setOpenUserMenu(false)}>
              <li>My Posts</li>
            </Link>

            <li
              className="cursor-pointer"
              onClick={() => {
                signOut();
                // revalidatePath("/userposts");
              }}
            >
              Sign out
            </li>
          </ul>
        )}

        <div>
          <MobileMenu user={userData} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
