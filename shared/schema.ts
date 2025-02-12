import { z } from "zod";

// Simple validation schema for stats without database dependencies
export const statsSchema = z.object({
  totalGames: z.number(),
  wins: z.number(),
  currentStreak: z.number(),
  maxStreak: z.number(),
});

export type Stats = z.infer<typeof statsSchema>;