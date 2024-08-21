"use client";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";

import { UserAvatar } from "@/components/common/user-avatar";
import { VerifiedMark } from "@/components/common/verified-mark";
import { HeaderActions } from "./header-actions";

interface HeadersProps {
  host: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

export const Header = ({
  host,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: HeadersProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive: boolean = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViwer = `host-${hostIdentity}`;

  const isHost = viewerIdentity === hostAsViwer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={host}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{host}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <HeaderActions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};
