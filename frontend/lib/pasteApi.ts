import { CreatePasteData, Paste } from "@/types/paste";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const createPaste = async (data: CreatePasteData): Promise<Paste> => {
  const response = await fetch(`${API_URL}/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create paste");
  }
  return result.paste;
};
export const getPaste = async (shortId: string): Promise<Paste> => {
  const response = await fetch(`${API_URL}/pastes/${shortId}`, {
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Paste not found");
  }
  return result.paste;
};
