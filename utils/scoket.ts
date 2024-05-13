export type Message = {
  type: string;
  content: string | null;
  status?: "Replying" | "End" | "Start";
  stop_id?: string;
};

type Events = {
  message: ((data: Message) => void)[];
};

class WebSocketClient {
  private socket: WebSocket | null = null;
  private events: Events = { message: [] };
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private heartbeatMessage: Message = {
    type: "heartbeat",
    content: "ping",
  };

  public clientId: string = "";

  constructor(
    private options: {
      url: string;
      heartbeatIntervalSeconds?: number;
      onOpen?: (event: Event) => void;
      onMessage?: (message: Message) => void;
      onClose?: (event: Event) => void;
      onError?: (event: Event) => void;
    }
  ) {}

  isReady(): boolean {
    return (
      !!this.socket &&
      this.socket.readyState === WebSocket.OPEN &&
      !!this.clientId
    );
  }

  addEvent(event: keyof Events, listener: (data: Message) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  removeEvent(event: keyof Events, listener: (data: Message) => void) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emitEvent(event: keyof Events, data: Message) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((listener) => {
      listener(data);
    });
  }

  connect() {
    const {
      url,
      onOpen,
      onMessage,
      onError,
      onClose,
      heartbeatIntervalSeconds,
    } = this.options;
    this.socket = new WebSocket(url);
    this.socket.addEventListener("open", (event) => {
      if (heartbeatIntervalSeconds) {
        this.setupHeartbeat();
      }
    });
    this.socket.addEventListener("message", (event) => {
      try {
        const result = JSON.parse(event.data) ?? {};
        const { type, data } = result;

        switch (type) {
          case "config":
            this.clientId = data.client_id;
            onOpen?.(event);
            break;
          case "Chat":
            onMessage?.(data);
            this.events.message.forEach((listener) => {
              listener(data);
            });
            break;
          default:
            break;
        }
      } catch (e: any) {
        onError?.(e);
      }
    });
    this.socket.addEventListener("close", (event) => {
      this.clearHeartbeat();
      onClose?.(event);
    });
    this.socket.addEventListener("error", (event) => {
      onError?.(event);
    });
    return this;
  }

  private setupHeartbeat(): void {
    const { heartbeatIntervalSeconds } = this.options;
    if (heartbeatIntervalSeconds) {
      this.heartbeatInterval = setInterval(() => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.send(this.heartbeatMessage);
        }
      }, heartbeatIntervalSeconds * 1000);
    }
  }

  private clearHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  send(message: Message): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Message not sent:", message);
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketClient;
