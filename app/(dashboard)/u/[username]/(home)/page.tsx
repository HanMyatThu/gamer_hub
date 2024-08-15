import { currentUser } from "@clerk/nextjs/server";

import { getUserByUserName } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream/stream-player";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);
  if (!user || user.externalUserId !== externalUser?.id || !user.Stream) {
    throw new Error("Unauthorized!");
  }
  return (
    <div>
      <StreamPlayer user={user} stream={user.Stream} isFollowing={true} />
    </div>
  );
};

export default CreatorPage;
