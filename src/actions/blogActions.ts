"use server";

import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function createPost(data: any) {
  console.log("inside create Post", data);
  const {
    title,
    description: desc,
    category: cat,
    email: userEmail,
    image,
  } = data;
  // const title = formData.get("title") as string;
  // const desc = formData.get("description") as string;
  // const cat = formData.get("category") as string;
  // const userEmail = formData.get("email") as string;
  // const image = formData.get("image") as string;

  const post = await prisma.blog.create({
    data: {
      img: image,
      title: title,
      desc: desc,
      category: cat,
      userEmail: userEmail,
    },
  });

  revalidatePath("/create");
  return post;
}

export async function deletePost(formData: FormData) {
  const id = formData.get("postId") as string;

  await prisma.blog.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/userposts");
}
