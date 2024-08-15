import prisma from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = []

  if (userId) {
     users = await prisma.user.findMany({
       where: {
         AND: [
          {
            NOT: {
              id: userId
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockerId: userId
                }
              }
            }
          }
         ]
      },
      orderBy: {
        createdAt: 'desc'
       },
      include: {
        blockedBy: true,
        Stream: true,
      }
    });
  } else {
     users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
       },
       include: {
         Stream: true,
       }
    });
  }
  return users;
}