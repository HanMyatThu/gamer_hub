import prisma from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf()

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (user.id === self.id) {
      return false;
    }

    const block = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId: self.id
        }
      }
    })

    return !!block; 
  } catch {
    return false
  }
}

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("You cannot block yourself");
  }

  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (!user) {
    throw new Error("User Not Found")
  }

  const isBlocked = await prisma.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: user.id,
    },
  })

  if (isBlocked) {
    throw new Error("Already Blocked");
  }

  const block = await prisma.block.create({
    data: {
      blockerId: self.id,
      blockedId: user.id
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const isBlocked = await prisma.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: user.id,
    },
  });

  if (!isBlocked) {
    throw new Error("You are not blocking this user");
  }

  const unblock = await prisma.block.delete({
    where: { id: isBlocked.id },
    include: { blocked: true}
  });

  return unblock;
}