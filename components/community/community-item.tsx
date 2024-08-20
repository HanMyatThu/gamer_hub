"use client";
import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  key: string;
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  key,
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [pending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div
      className={cn(
        "gropu flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        pending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <ToolTipHint label="Block">
          <Button
            disabled={pending}
            onClick={handleBlock}
            variant="ghost"
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MinusCircle className="size-4 text-muted-foreground" />
          </Button>
        </ToolTipHint>
      )}
    </div>
  );
};
