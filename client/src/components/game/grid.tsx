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
    <div className="flex justify-center items-center">
    <div className="inline-grid gap-[2px] mx-auto">
      {rows.map((_, i) => {
        const isCurrentRow = i === currentRow;
        const guess = isCurrentRow ? currentGuess : guesses[i] || "";

        return (
          <div key={i} className="grid grid-cols-6 gap-[2px]">
            {Array(6).fill("").map((_, j) => {
              const digit = guess[j];
              const solutionDigit = solution[j];

              let bgColor = "bg-background";
              let textColor = "text-foreground";
              let borderColor = "border-muted";

              if (digit && !isCurrentRow) {
                if (digit === solutionDigit) {
                  bgColor = "bg-green-500";
                  textColor = "text-primary-foreground";
                  borderColor = "border-green-500";
                } else if (solution.includes(digit)) {
                  const guessCount = guess.slice(0, j + 1).split('').filter(d => d === digit).length;
                  const solutionCount = solution.split('').filter(d => d === digit).length;

                  if (guessCount <= solutionCount) {
                    bgColor = "bg-yellow-500";
                    textColor = "text-primary-foreground";
                    borderColor = "border-yellow-500";
                  } else {
                    bgColor = "bg-muted";
                    textColor = "text-foreground";
                  }
                } else {
                  bgColor = "bg-muted";
                  textColor = "text-foreground";
                }
              }

              return (
                <div
                  key={j}
                  className={cn(
                    "w-12 h-12 border-2 flex items-center justify-center text-lg font-bold rounded-sm transition-colors",
                    bgColor,
                    textColor,
                    borderColor,
                    isCurrentRow && digit && "border-primary",
                    isCurrentRow && !digit && "border-muted",
                    !isCurrentRow && !digit && "border-muted"
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
    </div>
  );
}