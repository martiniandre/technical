import type { WsMessage } from '../types';
import { useAuthStore } from '../store/useAuthStore';

type WsEvent = 'dashboard:update' | 'connect' | 'disconnect' | 'error';
type EventHandler<T = unknown> = (payload: T) => void;
type Listeners = Map<WsEvent, Set<EventHandler<any>>>;

const WS_URL = import.meta.env.VITE_WS_URL;

class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private listeners: Listeners = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnecting = false;

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  on<T>(event: WsEvent, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as EventHandler<unknown>);
    return () => this.off(event, handler);
  }

  off<T>(event: WsEvent, handler: EventHandler<T>): void {
    this.listeners.get(event)?.delete(handler as EventHandler<unknown>);
  }

  private emit<T>(event: WsEvent, payload?: T): void {
    this.listeners.get(event)?.forEach((h) => h(payload));
  }

  connect(): void {
    const token = useAuthStore.getState().token;
    if (!token) return;
    if (this.isConnecting) return;
    if (this.socket && this.socket.readyState <= WebSocket.OPEN) return;

    this.isConnecting = true;

    const url = `${WS_URL}?token=${token}`;
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      this.isConnecting = false;
      this.emit('connect');
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data as string) as WsMessage;

        if (msg.event === 'initial' || msg.event === 'update') {
          if (msg.data) this.emit('dashboard:update', msg.data);
        }

        if (msg.event === 'error') {
          this.emit('error', msg.message);
        }
      } catch {
        throw Error("Failed on process websocket data")
      }
    });

    this.socket.addEventListener('close', () => {
      this.isConnecting = false;
      this.emit('disconnect');
      this.socket = null;
    });

    this.socket.addEventListener('error', () => {
      this.emit('error');
    });
  }

  sendLogout(): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event: 'logout' }));
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.isConnecting = false;
    this.sendLogout();
    this.socket?.close();
    this.socket = null;
  }
}

export const wsService = WebSocketService.getInstance();
