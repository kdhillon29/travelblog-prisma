import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function getSession() {
  return await getServerSession(authOptions);
}
export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    console.log("session:", session);
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    console.log("current user is ", currentUser);
    if (!currentUser) {
      return session.user;
    }

    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // revalidatePath("/userposts");
  }
};
// export const cache(getCurrentUser)
