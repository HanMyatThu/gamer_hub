import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { ToggleSidebar } from "./toggle-sidebar";
import { Wrapper } from "./wrapper";

export const SideBar = async () => {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#18191f] border-r border-[#2D2E35] z-50 ">
      <RecommendedSkeleton />
    </aside>
  );
};
