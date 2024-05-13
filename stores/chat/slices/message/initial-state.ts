import WebSocketClient from "@/utils/scoket";
import { useEventEmitter } from "ahooks";

export interface MessageState {
  socket?: WebSocketClient;
  replyingMessage?: API.ChatMessage & {
    stopId?: string;
    error?: boolean;
  };
  messages: API.ChatMessage[];
}

export const initialMessageState: MessageState = {
  messages: [],
};
