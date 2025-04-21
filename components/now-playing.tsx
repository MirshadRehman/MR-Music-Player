"use client"

import { Music } from "lucide-react"
import ProgressBar from "@/components/progress-bar"
import PlaybackControls from "@/components/playback-controls"
import VolumeControl from "@/components/volume-control"
import type { Song } from "@/components/music-player"

interface NowPlayingProps {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isShuffleOn: boolean
  repeatMode: "off" | "all" | "one"
  onTogglePlay: () => void
  onToggleMute: () => void
  onVolumeChange: (value: number[]) => void
  onProgressChange: (value: number[]) => void
  onSkipNext: () => void
  onSkipPrevious: () => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
}

export default function NowPlaying({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffleOn,
  repeatMode,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onProgressChange,
  onSkipNext,
  onSkipPrevious,
  onToggleShuffle,
  onToggleRepeat,
}: NowPlayingProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-sky-100 dark:border-slate-700 transition-colors duration-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-sky-100 dark:bg-sky-900/30 rounded-lg p-3 flex-shrink-0">
          <Music className="w-10 h-10 text-sky-500 dark:text-sky-400" />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-medium truncate text-sky-900 dark:text-sky-100">
            {currentSong ? currentSong.name : "No song selected"}
          </h3>
          <p className="text-sky-600 dark:text-sky-400 text-sm truncate">
            {currentSong ? currentSong.artist || "Unknown artist" : "Upload a song to start playing"}
          </p>
        </div>
      </div>

      <ProgressBar currentTime={currentTime} duration={duration} onChange={onProgressChange} disabled={!currentSong} />

      <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between mt-4">
        <PlaybackControls
          isPlaying={isPlaying}
          isShuffleOn={isShuffleOn}
          repeatMode={repeatMode}
          onTogglePlay={onTogglePlay}
          onSkipNext={onSkipNext}
          onSkipPrevious={onSkipPrevious}
          onToggleShuffle={onToggleShuffle}
          onToggleRepeat={onToggleRepeat}
          disabled={!currentSong}
        />

        <VolumeControl volume={volume} isMuted={isMuted} onToggleMute={onToggleMute} onVolumeChange={onVolumeChange} />
      </div>
    </div>
  )
}
