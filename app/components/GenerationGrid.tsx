import { ReactNode } from "react";
import { cn } from "../lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
  iconBg?: string;
  isNew?: boolean;
  className?: string;
}



export default function GenerationGrid({
  title,
  description,
  icon: Icon,
  iconBg,
  isNew = false,
  className,
}: Feature) {
  return (
    <div
      className={cn('grid grid-cols-[1fr_auto] items-center gap-12', className)}
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">
        {Icon && (
          <div
            className={cn(
              'aspect-square flex size-10 flex-shrink-0 items-center justify-center rounded-[10px] inset-ring-[0.5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_1px_5px_rgba(255,255,255,0.1)] inset-ring-black/10',
              iconBg,
            )}
          >
            {Icon}
          </div>
        )}

        <div className="block space-y-0.5">
          <div className="flex items-center gap-2">
            <p className="font-medium theme-text-primary text-sm">
              {title}
            </p>

            {isNew && (
              <span className="rounded-md bg-[#006eff] px-2 py-0.5 text-xs font-semibold text-white">
                New
              </span>
            )}
          </div>
          <p className="text-xs opacity-80">{description}</p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-0 self-center">
        <button type="button" className="px-5 py-1 rounded-full theme-bg-secondary text-xs theme-text-primary hover:brightness-95" aria-label={`Open ${title}`}>
            Open
        </button>
      </div>
    </div>
  )
}