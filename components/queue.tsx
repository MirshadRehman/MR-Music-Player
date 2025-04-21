"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatTime } from "@/lib/utils"
import type { Song } from "@/components/music-player"

interface QueueProps {
  queue: Song[]
  onRemoveFromQueue: (index: number) => void
}

export default function Queue({ queue, onRemoveFromQueue }: QueueProps) {
  if (queue.length === 0) {
    return (
      <div className="text-center py-8 text-sky-600 dark:text-sky-400">
        <p>Your queue is empty</p>
        <p className="text-sm mt-2">Add songs to your queue from the library</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-1">
        {queue.map((song, index) => (
          <div
            key={`${song.id}-${index}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-sky-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 flex-grow min-w-0">
              <div className="text-sky-500 dark:text-sky-400 w-6 text-center text-sm">
                {index === 0 ? "Next" : index + 1}
              </div>
              <div className="flex-grow min-w-0">
                <p className="truncate font-medium text-sky-900 dark:text-sky-100">{song.name}</p>
                <p className="text-xs text-sky-500 dark:text-sky-400 truncate">{formatTime(song.duration)}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sky-400 dark:text-sky-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-sky-50 dark:hover:bg-slate-700/50"
              onClick={() => onRemoveFromQueue(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
