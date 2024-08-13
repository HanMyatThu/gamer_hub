import { isFollowingUser } from "@/lib/follwer-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Action } from "./_components/actions";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div>
      User Page
      <p>{user.username}</p>
      <p>{user.id}</p>
      <p>Isfollowing {isFollowing ? "true" : "false"}</p>
      <Action userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
