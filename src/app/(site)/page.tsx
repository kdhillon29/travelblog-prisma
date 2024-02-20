import Hero from "@/components/shared/Hero";
import Image from "next/image";
import { blogData } from "@/constants/blogData";

export default function Home() {
  const posts = blogData;
  return (
    <main className="">
      <Hero posts={posts} />
    </main>
  );
}
