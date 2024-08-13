import { redirect } from "next/navigation";

import { Navbar } from "./_components/navbar";
import { getSelfByUserName } from "@/lib/auth-service";
import { SideBar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface DashBoardLayout {
  params: { username: string };
  children: React.ReactNode;
}

const DashBoardLayout = async ({ params, children }: DashBoardLayout) => {
  const self = await getSelfByUserName(params.username);

  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default DashBoardLayout;
