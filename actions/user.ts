"use server";
import { User } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();
  const validData = {
    bio: values.bio,
  };
  const user = await prisma.user.update({
    where: { id: self.id },
    data: {
      ...validData
    }
  })

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
}