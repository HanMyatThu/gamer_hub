import prisma from "./db"

export const getUserByUserName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      Stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        }
      }
    }
  });

  return user;
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Stream: true
    },
  });
  return user;
}