"use client";

import { Button } from "@/components/ui/button";
import { onFollow, unFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Action = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      unFollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleBlock} variant="primary">
        BLock
      </Button>
    </>
  );
};
