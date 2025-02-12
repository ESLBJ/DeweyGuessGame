import { Button } from "@/components/ui/button";

interface KeyboardProps {
  onKey: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

export function Keyboard({ onKey, onEnter, onDelete }: KeyboardProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="max-w-md mx-auto p-1">
      <div className="grid grid-cols-5 gap-1">
        {keys.map((key) => (
          <Button
            key={key}
            variant="outline"
            onClick={() => onKey(key)}
            className="h-10 text-base"
          >
            {key}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 mt-1">
        <Button
          variant="secondary"
          onClick={onDelete}
          className="h-10 text-base"
        >
          Delete
        </Button>
        <Button
          onClick={onEnter}
          className="h-10 text-base"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
