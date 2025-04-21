"use client"

import { useState, useRef, useEffect } from "react"
import UploadArea from "@/components/upload-area"
import NowPlaying from "@/components/now-playing"
import Library from "@/components/library"
import Queue from "@/components/queue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Song {
  id: string
  name: string
  artist?: string
  file: File
  duration: number
  url: string
}

export default function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [queue, setQueue] = useState<Song[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume

    // Event listeners
    audioRef.current.addEventListener("timeupdate", updateProgress)
    audioRef.current.addEventListener("ended", handleSongEnd)
    audioRef.current.addEventListener("loadedmetadata", () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress)
        audioRef.current.removeEventListener("ended", handleSongEnd)
        audioRef.current.pause()
        URL.revokeObjectURL(audioRef.current.src)
      }
    }
  }, [])

  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback failed:", err))
      }
    }
  }, [currentSong])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Update playback state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Playback failed:", err)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSongEnd = () => {
    if (repeatMode === "one") {
      // Repeat the current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((err) => console.error("Playback failed:", err))
      }
    } else if (queue.length > 0) {
      // Play next song in queue
      const nextSong = queue[0]
      const newQueue = queue.slice(1)
      setQueue(newQueue)
      setCurrentSong(nextSong)
    } else if (repeatMode === "all" && songs.length > 0) {
      // Play first song if repeat all is on
      const currentIndex = currentSong ? songs.findIndex((s) => s.id === currentSong.id) : -1
      const nextIndex = (currentIndex + 1) % songs.length
      setCurrentSong(songs[nextIndex])
    } else {
      // Stop playback if no more songs
      setIsPlaying(false)
    }
  }

  const addFiles = (files: File[]) => {
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"))

    if (audioFiles.length === 0) return

    const newSongs = audioFiles.map((file) => {
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)

      return new Promise<Song>((resolve) => {
        audio.onloadedmetadata = () => {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name.replace(/\.[^/.]+$/, ""),
            file: file,
            duration: audio.duration,
            url: url,
          })
        }

        // Handle files that might not load properly
        audio.onerror = () => {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name.replace(/\.[^/.]+$/, ""),
            file: file,
            duration: 0,
            url: url,
          })
        }
      })
    })

    Promise.all(newSongs).then((loadedSongs) => {
      setSongs((prev) => [...prev, ...loadedSongs])

      // If no song is currently playing, set the first uploaded song as current
      if (!currentSong && loadedSongs.length > 0) {
        setCurrentSong(loadedSongs[0])
      }
    })
  }

  const togglePlay = () => {
    if (!currentSong && songs.length > 0) {
      setCurrentSong(songs[0])
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const addToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song])
  }

  const playNext = (song: Song) => {
    setQueue((prev) => [song, ...prev])
  }

  const skipToNext = () => {
    if (queue.length > 0) {
      // Play next song in queue
      const nextSong = queue[0]
      const newQueue = queue.slice(1)
      setQueue(newQueue)
      setCurrentSong(nextSong)
    } else if (songs.length > 0) {
      // Play next song in playlist
      const currentIndex = currentSong ? songs.findIndex((s) => s.id === currentSong.id) : -1

      if (isShuffleOn) {
        // Play random song if shuffle is on
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * songs.length)
        } while (randomIndex === currentIndex && songs.length > 1)

        setCurrentSong(songs[randomIndex])
      } else {
        // Play next song in order
        const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0
        setCurrentSong(songs[nextIndex])
      }
    }
  }

  const skipToPrevious = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If current time is more than 3 seconds, restart the song
      audioRef.current.currentTime = 0
    } else if (songs.length > 0) {
      // Play previous song
      const currentIndex = currentSong ? songs.findIndex((s) => s.id === currentSong.id) : -1
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1
      setCurrentSong(songs[prevIndex])
    }
  }

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn)
  }

  const toggleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all")
    else if (repeatMode === "all") setRepeatMode("one")
    else setRepeatMode("off")
  }

  const removeSong = (id: string) => {
    // Remove from songs list
    setSongs((prev) => prev.filter((song) => song.id !== id))

    // Remove from queue if present
    setQueue((prev) => prev.filter((song) => song.id !== id))

    // If it's the current song, play next
    if (currentSong && currentSong.id === id) {
      skipToNext()
    }
  }

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-6">
      <UploadArea onFilesAdded={addFiles} />

      <NowPlaying
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isShuffleOn={isShuffleOn}
        repeatMode={repeatMode}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onProgressChange={handleProgressChange}
        onSkipNext={skipToNext}
        onSkipPrevious={skipToPrevious}
        onToggleShuffle={toggleShuffle}
        onToggleRepeat={toggleRepeat}
      />

      <Tabs
        defaultValue="library"
        className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-sky-100 dark:border-slate-700 transition-colors duration-200"
      >
        <TabsList className="grid grid-cols-2 mb-4 bg-sky-100 dark:bg-slate-700">
          <TabsTrigger
            value="library"
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600"
          >
            Library
          </TabsTrigger>
          <TabsTrigger
            value="queue"
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600"
          >
            Queue {queue.length > 0 && `(${queue.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="p-4">
          <Library
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={playSong}
            onAddToQueue={addToQueue}
            onPlayNext={playNext}
            onRemoveSong={removeSong}
          />
        </TabsContent>

        <TabsContent value="queue" className="p-4">
          <Queue queue={queue} onRemoveFromQueue={removeFromQueue} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
