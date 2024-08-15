import prisma from "./db"

export const getUserByUserName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      Stream: true,
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