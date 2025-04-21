"use client"

import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1Icon as RepeatOne } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PlaybackControlsProps {
  isPlaying: boolean
  isShuffleOn: boolean
  repeatMode: "off" | "all" | "one"
  onTogglePlay: () => void
  onSkipNext: () => void
  onSkipPrevious: () => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
  disabled: boolean
}

export default function PlaybackControls({
  isPlaying,
  isShuffleOn,
  repeatMode,
  onTogglePlay,
  onSkipNext,
  onSkipPrevious,
  onToggleShuffle,
  onToggleRepeat,
  disabled,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleShuffle}
          className={cn(
            "text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/20",
            isShuffleOn && "text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20",
          )}
        >
          <Shuffle size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleRepeat}
          className={cn(
            "text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/20",
            repeatMode !== "off" && "text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20",
          )}
        >
          {repeatMode === "one" ? <RepeatOne size={18} /> : <Repeat size={18} />}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSkipPrevious}
          disabled={disabled}
          className="text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/20"
        >
          <SkipBack size={20} />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
          onClick={onTogglePlay}
          disabled={disabled}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSkipNext}
          disabled={disabled}
          className="text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/20"
        >
          <SkipForward size={20} />
        </Button>
      </div>
    </div>
  )
}
