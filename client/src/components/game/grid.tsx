import { cn } from "@/lib/utils";

interface GridProps {
  guesses: string[];
  solution: string;
  currentRow: number;
  currentGuess: string;
}

export function Grid({ guesses, solution, currentRow, currentGuess }: GridProps) {
  const rows = Array(6).fill("");

  return (
    <div className="grid gap-2 mx-auto max-w-sm">
      {rows.map((_, i) => {
        const isCurrentRow = i === currentRow;
        const guess = isCurrentRow ? currentGuess : guesses[i] || "";

        return (
          <div key={i} className="grid grid-cols-6 gap-2">
            {Array(6).fill("").map((_, j) => {
              const digit = guess[j];
              const solutionDigit = solution[j];

              let bgColor = "bg-background";
              let textColor = "";
              if (digit && !isCurrentRow) {
                if (digit === solutionDigit) {
                  bgColor = "bg-green-500";
                  textColor = "text-primary-foreground";
                } else if (solution.includes(digit)) {
                  // Need to account for duplicate digits
                  // Count how many times this digit appears in both strings
                  const guessCount = [...guess.slice(0, j + 1)].filter(d => d === digit).length;
                  const solutionCount = [...solution].filter(d => d === digit).length;

                  // Only show yellow if we haven't exceeded the count in solution
                  if (guessCount <= solutionCount) {
                    bgColor = "bg-yellow-500";
                    textColor = "text-primary-foreground";
                  } else {
                    bgColor = "bg-muted";
                  }
                } else {
                  bgColor = "bg-muted";
                }
              }

              return (
                <div
                  key={j}
                  className={cn(
                    "w-12 h-12 border-2 flex items-center justify-center text-xl font-bold transition-colors",
                    bgColor,
                    textColor,
                    isCurrentRow && "border-primary"
                  )}
                >
                  {digit}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}