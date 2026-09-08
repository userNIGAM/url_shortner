export interface Paste {
  id: string;
  content: string;
  language: string;
  expiresAt: string | null;
  views: number;
  createdAt: string;
}
export interface CreatePasteData {
  content: string;
  language: string;
  expiration: string;
}
