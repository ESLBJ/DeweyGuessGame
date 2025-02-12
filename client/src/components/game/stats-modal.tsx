import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GameStats } from "@shared/types";
import { Progress } from "@/components/ui/progress";

interface StatsModalProps {
  open: boolean;
  onClose: () => void;
  stats: GameStats;
}

export function StatsModal({ open, onClose, stats }: StatsModalProps) {
  const winRate = stats.totalGames > 0 
    ? Math.round((stats.wins / stats.totalGames) * 100)
    : 0;

  const maxGuesses = Math.max(...Object.values(stats.guessDistribution || {}), 1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 text-center my-4">
          <div>
            <div className="text-2xl font-bold">{stats.totalGames}</div>
            <div className="text-sm text-muted-foreground">Played</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{winRate}%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.maxStreak}</div>
            <div className="text-sm text-muted-foreground">Max Streak</div>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="text-lg font-bold">Guess Distribution</div>
          {[1, 2, 3, 4, 5, 6].map((attempt) => (
            <div key={attempt} className="flex items-center gap-2">
              <div className="w-4">{attempt}</div>
              <div className="flex-1 h-5 bg-muted flex items-center">
                <div 
                  className="h-full bg-primary flex items-center justify-end px-2"
                  style={{ 
                    width: `${((stats.guessDistribution?.[attempt] || 0) / maxGuesses) * 100}%`,
                    minWidth: stats.guessDistribution?.[attempt] ? '10%' : '0%'
                  }}
                >
                  <span className="text-primary-foreground text-sm">
                    {stats.guessDistribution?.[attempt] || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
