import { stats, type Stats, type InsertStats } from "@shared/schema";
import type { GameStats } from "@shared/types";

export interface IStorage {
  getStats(): Promise<GameStats>;
  updateStats(stats: GameStats): Promise<void>;
}

export class MemStorage implements IStorage {
  private stats: GameStats;

  constructor() {
    this.stats = {
      totalGames: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
    };
  }

  async getStats(): Promise<GameStats> {
    return this.stats;
  }

  async updateStats(newStats: GameStats): Promise<void> {
    this.stats = newStats;
  }
}

export const storage = new MemStorage();
