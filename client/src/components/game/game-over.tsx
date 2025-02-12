import { Share } from "lucide-react";
import { Button } from "../ui/button";

interface GameOverProps {
  won: boolean;
  solution: string;
  guesses: string[];
  book: {
    title: string;
    author: string;
  };
  attempts: number;
}

function generateShareText(won: boolean, attempts: number, book: { title: string, author: string }) {
  return `I ${won ? 'solved' : 'attempted'} the DDC Wordle for "${book.title}" by ${book.author} ${won ? `in ${attempts} attempts` : 'but couldn\'t solve it'}!`;
}

function generateGuessGrid(guesses: string[], solution: string) {
  return guesses.map(guess => {
    return guess.split('').map((digit, i) => {
      if (digit === solution[i]) return '🟩';
      if (solution.includes(digit)) return '🟨';
      return '⬜';
    }).join('');
  }).join('\n');
}

export function GameOver({ won, solution, guesses, book, attempts }: GameOverProps) {
  const shareText = generateShareText(won, attempts, book) + '\n\n' + generateGuessGrid(guesses, solution);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">
        {won ? 'Congratulations!' : 'Better luck next time!'}
      </h2>
      <Button onClick={handleShare}>
        <Share className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}