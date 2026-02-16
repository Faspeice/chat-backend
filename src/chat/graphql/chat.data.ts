export type ChatData = {
  id: number;
  members: Array<{ user: { id: number; username: string }; joinedAt: Date }>;
};