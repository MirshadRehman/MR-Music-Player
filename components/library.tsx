import { ScrollArea } from "@/components/ui/scroll-area"
import SongItem from "@/components/song-item"
import type { Song } from "@/components/music-player"

interface LibraryProps {
  songs: Song[]
  currentSong: Song | null
  isPlaying: boolean
  onPlaySong: (song: Song) => void
  onAddToQueue: (song: Song) => void
  onPlayNext: (song: Song) => void
  onRemoveSong: (id: string) => void
}

export default function Library({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onAddToQueue,
  onPlayNext,
  onRemoveSong,
}: LibraryProps) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-8 text-sky-600 dark:text-sky-400">
        <p>Your library is empty</p>
        <p className="text-sm mt-2">Upload some music to get started</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-1">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isActive={currentSong?.id === song.id}
            isPlaying={isPlaying && currentSong?.id === song.id}
            onPlay={() => onPlaySong(song)}
            onAddToQueue={() => onAddToQueue(song)}
            onPlayNext={() => onPlayNext(song)}
            onRemove={() => onRemoveSong(song.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
