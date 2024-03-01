// app/actions.ts

"use server";

import { IFormInput } from "@/app/(auth)/access/register/page";
import prisma from "@/lib/prismadb";

import { hash } from "bcrypt";
import { log } from "console";
import { revalidatePath } from "next/cache";

export async function handleRegisterSubmit(data: IFormInput) {
  console.log("in register server actions");
  const { userName, userEmail, password, confirm_password } = data;

  try {
    if (password !== confirm_password) {
      throw Error("Password and confirm password not matching");
      return "Error Passwrd not matching";
    }
    const exist = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (exist) {
      throw new Error("Email already exists");
      return { error: "user already exist" };
    }
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: userName,
        email: userEmail,
        hashedPassword: hashedPassword,
      },
    });
    if (user) {
      console.log("user signup Succesfully", user);
      return user;
    } else {
      console.log("error while signup");
    }
  } catch (error: any) {
    console.log("error whille sign up", error);
    return { error: "Server Error" };
  } finally {
    revalidatePath("/");
  }
}
