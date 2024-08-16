"use client";

import { Maximize, Minimize } from "lucide-react";
import { ToolTipHint } from "../common/tooltip-hint";

interface FullScreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({
  isFullScreen = false,
  onToggle,
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? "Exit Full Screen" : "Enter Full Screen";
  return (
    <div className="flex items-center justify-center gap-4">
      <ToolTipHint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="size-4" />
        </button>
      </ToolTipHint>
    </div>
  );
};
