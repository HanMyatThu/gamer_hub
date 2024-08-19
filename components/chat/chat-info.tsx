import { useMemo } from "react";
import { Info } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hints = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only followers only chat";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }

    if (isDelayed && isFollowersOnly) {
      return "Only followers only chat. Messages are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Slow Mode";
    }

    if (isDelayed && isFollowersOnly) {
      return "Followers Only and Slow Mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <ToolTipHint label={hints}>
        <Info className="size-4" />
      </ToolTipHint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
