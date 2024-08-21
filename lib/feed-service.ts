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
      include: {
        user: true
      },
    });
  } else {
    //no login
    streams = await prisma.stream.findMany({
      include: {
        user: true,
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