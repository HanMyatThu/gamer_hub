import { blockUser } from './block-service';
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

export const unfollowUser = async (userId: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!otherUser) {
    throw new Error("User Not Found");
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot unfollow yourself")
  }

  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    }
  });

  if (!isFollowing) {
    throw new Error("Not Following");
  }

  const follow = await prisma.follow.delete({
    where: { id: isFollowing.id },
    include: {
      following: true
    }
  })

  return follow;
}

export const getAllFollowedUser = async () => {
  try {
    const self = await getSelf();

    const followedUsers = await prisma.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blockedBy: {
            none: {
              blockerId: self.id,
            }
          }
        }
      },
      include: {
        following: {
          include: {
            Stream: {
              select: {
                isLive: true,
              }
            },
          },
        },
      },
    });
    return followedUsers
  } catch (e) {
    return []
  }
}