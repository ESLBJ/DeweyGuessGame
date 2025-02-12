import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  totalGames: integer("total_games").notNull().default(0),
  wins: integer("wins").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  maxStreak: integer("max_streak").notNull().default(0),
});

export const insertStatsSchema = createInsertSchema(stats).pick({
  totalGames: true,
  wins: true,
  currentStreak: true,
  maxStreak: true,
});

export type InsertStats = z.infer<typeof insertStatsSchema>;
export type Stats = typeof stats.$inferSelect;
