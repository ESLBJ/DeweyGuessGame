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
        <Progress value={winRate} className="w-full" />
      </DialogContent>
    </Dialog>
  );
}
