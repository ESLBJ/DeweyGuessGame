import { useState, useEffect } from "react";
import { getTodaysBook } from "@/lib/books";
import type { GameState, GameStats } from "@shared/types";

const GAME_STATE_KEY = "ddc-game-state";
const STATS_KEY = "ddc-stats";
const MAX_ATTEMPTS = 6;

const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      guesses: [],
      solution: getTodaysBook().ddc,
      won: false,
      lost: false,
      currentRow: 0,
    };
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const submitGuess = (guess: string) => {
    if (gameState.won || gameState.lost) return;

    const newGuesses = [...gameState.guesses, guess];
    const won = guess === gameState.solution;
    const lost = !won && newGuesses.length >= MAX_ATTEMPTS;

    if (won || lost) {
      const newStats = {
        totalGames: stats.totalGames + 1,
        wins: stats.wins + (won ? 1 : 0),
        currentStreak: won ? stats.currentStreak + 1 : 0,
        maxStreak: won
          ? Math.max(stats.maxStreak, stats.currentStreak + 1)
          : stats.maxStreak,
      };
      setStats(newStats);
    }

    setGameState({
      ...gameState,
      guesses: newGuesses,
      won,
      lost,
      currentRow: gameState.currentRow + 1,
    });
  };

  return {
    gameState,
    stats,
    submitGuess,
  };
}