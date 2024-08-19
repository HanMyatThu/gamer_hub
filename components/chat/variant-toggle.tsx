"use client";

import { MessageSquare, Users } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/usechat-sidebar";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);
  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Go back to Chat";

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
