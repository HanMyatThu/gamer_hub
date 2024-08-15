"use client";

import { useViewerToken } from "@/hooks/user-service";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { Stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  console.log(token, "test");
  console.log(name, "test");
  console.log(identity, "test");

  if (!token || !name || !identity) {
    return <div>Cannot Watch the stream</div>;
  }
  return <div>Allow to watch the stream {user.username}</div>;
};
