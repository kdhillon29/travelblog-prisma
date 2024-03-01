import Hero from "@/components/shared/Hero";
import Image from "next/image";
import { blogData } from "@/constants/blogData";
import prisma from "@/lib/prismadb";

import LatestPost from "@/components/shared/LatestPost";
import TopPost from "@/components/shared/TopPost";

export default async function Home() {
  const posts = await prisma.blog.findMany({
    include: {
      user: true,
    },
  });
  return (
    <>
      <Hero posts={posts} />
      <div className="grid md:grid-cols-3 grid-cols-1 lg:gap-10 w-[95%] mx-auto max-w-[1450px] overflow-y-hidden h-fit mt-10">
        <LatestPost posts={posts} />
        <TopPost posts={posts} />
      </div>
    </>
  );
}
