import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      externalUserId: self.id
    }
  })

  if (!user) {
    throw new Error("User Not Found");
  }
  return user;
}

export const getSelfByUserName = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthrozied");
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
}