import { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function getTimeUntilTomorrow() {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilTomorrow());
    }, 1000);

    setTimeLeft(getTimeUntilTomorrow());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mt-4">
      <p className="text-sm text-muted-foreground">Next puzzle in</p>
      <p className="text-xl font-mono font-bold">{timeLeft}</p>
    </div>
  );
}
