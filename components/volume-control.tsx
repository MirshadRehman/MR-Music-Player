"use client"

import { Volume2, Volume1, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VolumeControlProps {
  volume: number
  isMuted: boolean
  onToggleMute: () => void
  onVolumeChange: (value: number[]) => void
}

export default function VolumeControl({ volume, isMuted, onToggleMute, onVolumeChange }: VolumeControlProps) {
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />
    if (volume < 0.5) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
        className="text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/20"
      >
        <VolumeIcon />
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
        className="w-24 [&>span:first-child]:h-1.5 [&>span:first-child]:bg-sky-100 dark:[&>span:first-child]:bg-slate-700 [&_[role=slider]]:bg-sky-500 dark:[&_[role=slider]]:bg-sky-400 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-sky-500 dark:[&>span:first-child_span]:bg-sky-400"
      />
    </div>
  )
}
