import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaThreads } from "react-icons/fa6";
import { SiSky } from "react-icons/si";
import type { Book } from "@shared/types";

interface GameOverModalProps {
  open: boolean;
  onClose: () => void;
  won: boolean;
  solution: string;
  guesses: string[];
  book: Book;
  attempts: number;
}

function generateShareText(won: boolean, attempts: number, book: Book) {
  const date = new Date().toLocaleDateString();
  const result = won ? `${attempts}/6` : 'X/6';
  return `DDC Wordle ${date}\n${result}\n"${book.title}" by ${book.author}`;
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

export function GameOverModal({ 
  open, 
  onClose, 
  won, 
  solution, 
  guesses,
  book,
  attempts
}: GameOverModalProps) {
  const shareText = generateShareText(won, attempts, book) + '\n\n' + generateGuessGrid(guesses, solution);

  const handleShare = (platform: 'twitter' | 'bluesky' | 'threads') => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      bluesky: `https://bsky.app/intent/post?text=${encodeURIComponent(shareText)}`,
      threads: `https://threads.net/intent/post?text=${encodeURIComponent(shareText)}`
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {won ? "Congratulations! 🎉" : "Game Over"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {won ? (
            <p className="text-lg">
              You found the correct DDC code in {attempts} {attempts === 1 ? 'try' : 'tries'}!
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg">Better luck next time!</p>
              <p>The correct DDC code was: <span className="font-bold">{solution}</span></p>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <p className="font-medium">Share your result:</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleShare('twitter')}
              >
                <FaTwitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleShare('bluesky')}
              >
                <SiSky className="h-4 w-4" />
                Bluesky
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleShare('threads')}
              >
                <FaThreads className="h-4 w-4" />
                Threads
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}