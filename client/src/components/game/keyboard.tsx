import { Button } from "@/components/ui/button";

interface KeyboardProps {
  onKey: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

export function Keyboard({ onKey, onEnter, onDelete }: KeyboardProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="max-w-lg mx-auto p-2">
      <div className="grid grid-cols-5 gap-2">
        {keys.map((key) => (
          <Button
            key={key}
            variant="outline"
            onClick={() => onKey(key)}
            className="h-14 text-lg"
          >
            {key}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          variant="secondary"
          onClick={onDelete}
          className="h-14 text-lg"
        >
          Delete
        </Button>
        <Button
          onClick={onEnter}
          className="h-14 text-lg"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
