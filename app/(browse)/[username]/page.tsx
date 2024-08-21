import { notFound } from "next/navigation";

import { StreamPlayer } from "@/components/stream/stream-player";
import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follwer-service";
import { getUserByUserName } from "@/lib/user-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user || !user.Stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.Stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
