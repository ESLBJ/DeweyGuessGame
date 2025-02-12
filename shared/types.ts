export interface Book {
  title: string;
  author: string;
  ddc: string;
}

export interface GameState {
  guesses: string[];
  solution: string;
  won: boolean;
  lost: boolean;
  currentRow: number;
}

export interface GameStats {
  totalGames: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
}
