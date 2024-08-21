import prisma from "@/lib/db"
import { getSelf } from "@/lib/auth-service"

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id
  } catch {
    userId = null
  }

  let streams = []
  if (userId) {
    //load by user id
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              }
            }
          }
        }
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc"
        }
      ]
    });
  } else {
    //no login
    streams = await prisma.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc"
        }
      ]
    })
  }

  return streams;
}