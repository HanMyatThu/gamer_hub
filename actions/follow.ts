"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follwer-service";

export const onFollow = async (id: string) => {
  try {
    const user = await followUser(id);

    revalidatePath("/");

    if (user) {
      revalidatePath(`/${user.following.username}`)
    }

    return user;
  } catch (error) {
    throw new Error("Internal Error");
  }
}

export const unFollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`)
    }
    return unfollowedUser;
  } catch {
    throw new Error("Internal Error");
  }
}