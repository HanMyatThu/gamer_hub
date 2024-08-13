import { ToggleDashBoardSidebar } from "./toggle-sidebar";
import { Wrapper } from "./wrapper";
import { Navigation } from "./navgitation";

export const SideBar = () => {
  return (
    <Wrapper>
      <ToggleDashBoardSidebar />
      <Navigation />
    </Wrapper>
  );
};
