import { cn } from "@/lib/utils";

interface GridProps {
  guesses: string[];
  solution: string;
  currentRow: number;
}

export function Grid({ guesses, solution, currentRow }: GridProps) {
  const rows = Array(6).fill("");

  return (
    <div className="grid gap-2 mx-auto max-w-sm">
      {rows.map((_, i) => {
        const guess = guesses[i] || "";
        const isCurrentRow = i === currentRow;

        return (
          <div key={i} className="grid grid-cols-6 gap-2">
            {Array(6).fill("").map((_, j) => {
              const letterGuess = guess[j];
              const letterSolution = solution[j];
              
              let bgColor = "bg-background";
              if (letterGuess) {
                if (letterGuess === letterSolution) {
                  bgColor = "bg-green-500";
                } else if (solution.includes(letterGuess)) {
                  bgColor = "bg-yellow-500";
                } else {
                  bgColor = "bg-muted";
                }
              }

              return (
                <div
                  key={j}
                  className={cn(
                    "w-12 h-12 border-2 flex items-center justify-center text-xl font-bold",
                    bgColor,
                    isCurrentRow && "border-primary"
                  )}
                >
                  {letterGuess}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
