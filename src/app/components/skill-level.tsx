"use client";

import { cn } from "@/lib/utils";

interface SkillLevelProps {
  level: number;
  maxLevel?: number;
  showLabel?: boolean;
}

const levelLabels = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

export function SkillLevel({
  level,
  maxLevel = 5,
  showLabel = false,
}: SkillLevelProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: maxLevel }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-6 rounded-full transition-colors",
              i < level ? "bg-accent" : "bg-muted",
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {levelLabels[level - 1]}
        </span>
      )}
    </div>
  );
}
