"use client"

import { Play, Pause, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/utils"
import type { Song } from "@/components/music-player"

interface SongItemProps {
  song: Song
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
  onAddToQueue: () => void
  onPlayNext: () => void
  onRemove: () => void
}

export default function SongItem({
  song,
  isActive,
  isPlaying,
  onPlay,
  onAddToQueue,
  onPlayNext,
  onRemove,
}: SongItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-2 rounded-md hover:bg-sky-50 dark:hover:bg-slate-700/50 transition-colors duration-200",
        isActive && "bg-sky-50 dark:bg-slate-700/50",
      )}
    >
      <div className="flex items-center gap-3 flex-grow min-w-0 cursor-pointer" onClick={onPlay}>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", isActive ? "text-sky-500 dark:text-sky-400" : "text-sky-700 dark:text-sky-300")}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </Button>
        <div className="flex-grow min-w-0">
          <p
            className={cn(
              "truncate font-medium",
              isActive ? "text-sky-700 dark:text-sky-300" : "text-sky-900 dark:text-sky-100",
            )}
          >
            {song.name}
          </p>
          <p className="text-xs text-sky-500 dark:text-sky-400 truncate">{formatTime(song.duration)}</p>
        </div>
      </div>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-slate-700/50"
            >
              <Plus size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 border-sky-100 dark:border-slate-700">
            <DropdownMenuItem
              onClick={onAddToQueue}
              className="text-sky-700 dark:text-sky-300 focus:text-sky-800 dark:focus:text-sky-200 focus:bg-sky-50 dark:focus:bg-slate-700/50"
            >
              Add to queue
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onPlayNext}
              className="text-sky-700 dark:text-sky-300 focus:text-sky-800 dark:focus:text-sky-200 focus:bg-sky-50 dark:focus:bg-slate-700/50"
            >
              Play next
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sky-400 dark:text-sky-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-sky-50 dark:hover:bg-slate-700/50"
          onClick={onRemove}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  )
}
