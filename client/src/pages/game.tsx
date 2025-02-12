import { useState } from "react";
import { useGame } from "@/hooks/use-game";
import { Grid } from "@/components/game/grid";
import { Keyboard } from "@/components/game/keyboard";
import { StatsModal } from "@/components/game/stats-modal";
import { GameOver } from "@/components/game/game-over";
import { Button } from "@/components/ui/button";
import { BarChart2, Sun, Moon } from "lucide-react";
import { getTodaysBook } from "@/lib/books";
import { useTheme } from "@/components/theme-provider";

export default function Game() {
  const { gameState, stats, submitGuess } = useGame();
  const [currentGuess, setCurrentGuess] = useState("");
  const [showStats, setShowStats] = useState(false);
  const { theme, setTheme } = useTheme();
  const todaysBook = getTodaysBook();

  const handleKey = (key: string) => {
    if (currentGuess.length < 6) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleEnter = () => {
    if (currentGuess.length === 6) {
      submitGuess(currentGuess);
      setCurrentGuess("");
    }
  };

  const gameIsOver = gameState.won || gameState.lost;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">DDC Wordle</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStats(true)}
          >
            <BarChart2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="container max-w-lg mx-auto p-4 space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">{todaysBook.title}</h2>
          <p className="text-muted-foreground">by {todaysBook.author}</p>
        </div>

        <Grid
          guesses={gameState.guesses}
          solution={gameState.solution}
          currentRow={gameState.currentRow}
          currentGuess={currentGuess}
        />

        <div className="mt-8">
          {gameIsOver ? (
            <GameOver
              won={gameState.won}
              solution={gameState.solution}
              guesses={gameState.guesses}
              book={todaysBook}
              attempts={gameState.currentRow}
            />
          ) : (
            <Keyboard
              onKey={handleKey}
              onDelete={handleDelete}
              onEnter={handleEnter}
            />
          )}
        </div>

        {stats && (
          <StatsModal
            open={showStats}
            onClose={() => setShowStats(false)}
            stats={stats}
          />
        )}
      </main>
    </div>
  );
}