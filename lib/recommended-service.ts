import prisma from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  const user = await getSelf();
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  });

  return users;
}