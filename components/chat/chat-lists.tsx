"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";

interface ChatListsProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatLists = ({ messages, isHidden }: ChatListsProps) => {
  if (!isHidden || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-1 overflow-y-auto p-3 h-full">
      <Skeleton className="px-3 py-3" />
    </div>
  );
};
