"use client";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CheckCheck, CopyIcon } from "lucide-react";

interface CopyButtonProps {
  value: string | null;
  label: string;
}

export const CopyButton = ({ value, label }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onClick = () => {
    if (!value) return;

    setIsCopied(true);
    toast.info(`${label}`);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : CopyIcon;

  return (
    <Button disabled={isCopied} onClick={onClick}>
      <Icon className="size-4" />
    </Button>
  );
};
