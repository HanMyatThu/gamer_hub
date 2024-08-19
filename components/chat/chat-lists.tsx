import { ReceivedChatMessage } from "@livekit/components-react";

interface ChatListsProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatLists = ({ messages, isHidden }: ChatListsProps) => {
  return (
    <div>
      chat <span>lists</span>
    </div>
  );
};
