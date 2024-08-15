"use client";
import { useState } from "react";

import { CopyButton } from "@/components/common/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              type={show ? "text" : "password"}
              value={value || ""}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value} label="Stream Key is copied!" />
          </div>
          <Button onClick={() => setShow(!show)} size="sm" variant="link">
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
