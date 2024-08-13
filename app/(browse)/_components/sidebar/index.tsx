import { Following, FollowingSkeleton } from "./following";
import { Wrapper } from "./wrapper";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { ToggleSidebar, ToggleSidebarSkeleton } from "./toggle-sidebar";

import { getAllFollowedUser } from "@/lib/follwer-service";
import { getRecommended } from "@/lib/recommended-service";

export const SideBar = async () => {
  const recommended = await getRecommended();
  const getFollowedUsers = await getAllFollowedUser();
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={getFollowedUsers} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#18191f] border-r border-[#2D2E35] z-50 ">
      <ToggleSidebarSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
