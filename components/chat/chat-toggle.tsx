"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/usechat-sidebar";

export const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    collapsed ? onExpand() : onCollapse();
  };

  const label = collapsed ? "Expend" : "Collapsed";

  return (
    <ToolTipHint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="size-4" />
      </Button>
    </ToolTipHint>
  );
};
