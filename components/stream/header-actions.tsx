"use client";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { onFollow, unFollow } from "@/actions/follow";
import { cn } from "@/lib/utils";

interface HeaderActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export const HeaderActions = ({
  isFollowing,
  hostIdentity,
  isHost,
}: HeaderActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      unFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      //redirect the user
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      //unfollow
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      disabled={isPending || isHost}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("size-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
