import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  filled: number;
  total?: number;
  className?: string;
};

export const StarRating = ({
  filled,
  total = 5,
  className,
}: StarRatingProps) => {
  const count = Math.min(Math.max(0, filled), total);

  return (
    <div
      role="img"
      className={cn("flex gap-0.5", className)}
      aria-label={`${count} out of ${total} stars`}
    >
      {Array.from({ length: total }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-5",
            i < count
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-amber-400/40"
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};
