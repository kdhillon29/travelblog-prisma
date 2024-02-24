// app/actions.ts

"use server";

import { IFormInput } from "@/app/register/page";
import prisma from "@/lib/prismadb";

import { hash } from "bcrypt";
import { log } from "console";
import { revalidatePath } from "next/cache";

export async function handleRegisterSubmit(data: IFormInput) {
  console.log("in register server actions");
  const { userName, userEmail, password } = data;
  const hashedPassword = await hash(password, 12);
  try {
    const user = await prisma.user.create({
      data: {
        name: userName,
        email: userEmail,
        hashedPassword: hashedPassword,
      },
    });
    if (user) {
      console.log("user signup Succesfully", user);
    } else {
      console.log("error while signup");
    }
  } catch (error) {
    console.log("error whill sign up", error);
  } finally {
    revalidatePath("/home");
  }
}
