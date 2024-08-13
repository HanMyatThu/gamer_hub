import prisma from "./db";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prisma.stream.findUnique({
    where: { userId },
  });
  return stream;
}

// mock function to create a stream 
export const createStream = async (username: string, userId: string) => {
  await prisma.stream.create({
    data: {
      name: `${username}'s stream`,
      userId: userId,
    }
  })
  return "ok"
}