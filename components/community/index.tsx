"use client";
import { useMemo } from "react";
import { useParticipants } from "@livekit/components-react";
import { useDebounceValue } from "usehooks-ts";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CommunityItem } from "./community-item";
import { Participant } from "livekit-client";

interface CommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export const Community = ({
  viewerName,
  hostName,
  isHidden,
}: CommunityProps) => {
  const participants = useParticipants();
  const [debouncedValue, updateDebouncedValue] = useDebounceValue<string>(
    "",
    500
  );

  const onChange = (newValue: string) => {
    updateDebouncedValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const depued = participants.reduce((acc: Participant[], participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as Participant[]);

    return depued.filter((de) =>
      de.name?.toLocaleLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);

  if (!isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((parti) => (
          <CommunityItem
            key={parti.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={parti.name}
            participantIdentity={parti.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
