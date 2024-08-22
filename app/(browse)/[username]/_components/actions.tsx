"use client";

import { Button } from "@/components/ui/button";
import { onFollow, unFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, unBlock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Action = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
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
          toast.success(`You have blocked ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      unBlock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
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
      <Button
        disabled={isPending}
        onClick={isBlocking ? handleUnblock : handleBlock}
        variant="primary"
      >
        {isBlocking ? "UnBlock" : "Block"}
      </Button>
    </>
  );
};
