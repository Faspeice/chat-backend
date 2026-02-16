import DataLoader from 'dataloader';
import { ChatRepository } from '../chat.repository';

const UNREAD_KEY = (userId: number, chatId: number) => `${userId}:${chatId}`;

export function createUnreadCountLoader(repo: ChatRepository): DataLoader<string, number> {
  return new DataLoader<string, number>(async (keys: readonly string[]) => {
    const byUser = new Map<number, number[]>();
    for (const key of keys) {
      const [userId, chatId] = key.split(':').map(Number);
      if (!byUser.has(userId)) byUser.set(userId, []);
      byUser.get(userId)!.push(chatId);
    }
    const allMaps: Array<{ userId: number; map: Map<number, number> }> = [];
    for (const [userId, chatIds] of byUser) {
      const map = await repo.getUnreadCountsForChats(userId, chatIds);
      allMaps.push({ userId, map });
    }
    return keys.map((key) => {
      const [userId, chatId] = key.split(':').map(Number);
      const entry = allMaps.find((e) => e.userId === userId);
      return entry ? entry.map.get(chatId) ?? 0 : 0;
    });
  });
}

export function createLastMessageLoader(
  repo: ChatRepository,
): DataLoader<number, { content: string; sentAt: Date } | null> {
  return new DataLoader<number, { content: string; sentAt: Date } | null>(
    async (chatIds: readonly number[]) => {
      const map = await repo.getLastMessages([...chatIds]);
      return chatIds.map((id) => map.get(id) ?? null);
    },
  );
}

export interface ChatLoaders {
  unreadCount: DataLoader<string, number>;
  lastMessage: DataLoader<number, { content: string; sentAt: Date } | null>;
}

export function createChatLoaders(repo: ChatRepository): ChatLoaders {
  return {
    unreadCount: createUnreadCountLoader(repo),
    lastMessage: createLastMessageLoader(repo),
  };
}

export function unreadCountKey(userId: number, chatId: number): string {
  return UNREAD_KEY(userId, chatId);
}
