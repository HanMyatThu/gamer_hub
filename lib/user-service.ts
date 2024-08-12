import prisma from "./db"

export const getUserByUserName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  return user;
}