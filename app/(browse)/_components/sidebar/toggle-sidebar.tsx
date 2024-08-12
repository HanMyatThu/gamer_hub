"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const ToggleSidebar = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <ToolTipHint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              size="sm"
              variant="ghost"
            >
              <ArrowLeftFromLine className="size-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4 ">
          <ToolTipHint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              className="h-auto p-2"
              size="sm"
              variant="ghost"
            >
              <ArrowRightFromLine className="size-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
    </>
  );
};

export const ToggleSidebarSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
