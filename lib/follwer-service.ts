import prisma from "./db";
import { getSelf } from "./auth-service";


export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf()

    const otherUser = await prisma.user.findUnique({
      where: {
        id
      },
    })

    if (!otherUser) {
      throw new Error("User Not Found")
    }

    if (otherUser.id === self.id) {
      return true; 
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User Not Found")
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot follow yourself")
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (existingFollow) {
    throw new Error("Already following")
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    }
  })

  return follow;
}