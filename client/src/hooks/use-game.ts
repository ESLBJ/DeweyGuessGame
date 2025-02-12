import { useState, useEffect } from "react";
import { getTodaysBook } from "@/lib/books";
import type { GameState, GameStats } from "@shared/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
const GAME_STATE_KEY = "ddc-game-state";
const MAX_ATTEMPTS = 6;
export function useGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      guesses: [],
      solution: getTodaysBook().ddc.toString().replace(/(\d{3})(\d{3})/, '$1.$2'),
      won: false,
      lost: false,
      currentRow: 0,
    };
  });
  const { data: stats = {
    totalGames: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
  } } = useQuery<GameStats>({
    queryKey: ["/api/stats"],
    refetchOnWindowFocus: false,
  });
  const updateStatsMutation = useMutation({
    mutationFn: async (newStats: GameStats) => {
      await apiRequest("POST", "/api/stats", newStats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });
  useEffect(() => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);
  const submitGuess = (guess: string) => {
    if (gameState.won || gameState.lost) return;
    const newGuesses = [...gameState.guesses, guess];
    const won = guess === gameState.solution;
    const lost = !won && newGuesses.length >= MAX_ATTEMPTS;
    if (won || lost) {
      const newStats = {
        totalGames: stats.totalGames + (gameState.currentRow === 0 ? 1 : 0),
        wins: stats.wins + (won ? 1 : 0),
        currentStreak: won ? stats.currentStreak + 1 : 0,
        maxStreak: won 
          ? Math.max(stats.maxStreak, stats.currentStreak + 1)
          : stats.maxStreak,
        guessDistribution: {
          ...stats.guessDistribution,
          [gameState.currentRow + 1]: (stats.guessDistribution?.[gameState.currentRow + 1] || 0) + (won ? 1 : 0),
        },
      };
      updateStatsMutation.mutate(newStats);
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