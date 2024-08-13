"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

export const ToggleDashBoardSidebar = () => {
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {!collapsed && (
        <div className="p-3 pl-6 mt-4 flex items-center w-full">
          <p className="font-semibold text-primary">Dashboard</p>
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
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mt-4">
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
