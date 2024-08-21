"use server";

import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";

const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;
const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!;

const roomService = new RoomServiceClient(
  wsUrl,
  apiKey,
  apiSecret
)

export const onBlock = async (id: string) => {
  try {
    const self = await getSelf();

    let blockedUser;

    try {
      blockedUser = await blockUser(id);
    } catch {
      //user is a guest
    }

    try {
      await roomService.removeParticipant(self.id, id)
    } catch {
      //user is not in the room

    }
    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
}

export const unBlock = async (id: string) => {
  try {
    const unBlockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unBlockedUser) {
      revalidatePath(`/${unBlockedUser.blocked.username}`)
    }
    return unBlockedUser;
  } catch {
    throw new Error("Internal Error");
  }
}