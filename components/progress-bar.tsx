"use client"

import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/utils"

interface ProgressBarProps {
  currentTime: number
  duration: number
  onChange: (value: number[]) => void
  disabled: boolean
}

export default function ProgressBar({ currentTime, duration, onChange, disabled }: ProgressBarProps) {
  return (
    <div>
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={0.1}
        onValueChange={onChange}
        disabled={disabled}
        className="mb-1 [&>span:first-child]:h-1.5 [&>span:first-child]:bg-sky-100 dark:[&>span:first-child]:bg-slate-700 [&_[role=slider]]:bg-sky-500 dark:[&_[role=slider]]:bg-sky-400 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-sky-500 dark:[&>span:first-child_span]:bg-sky-400"
      />
      <div className="flex justify-between text-xs text-sky-600 dark:text-sky-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
