import MusicPlayer from "@/components/music-player"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-50 dark:bg-slate-900 text-sky-950 dark:text-sky-100 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sky-800 dark:text-sky-300">MR Player</h1>
          <ThemeToggle />
        </div>
        <MusicPlayer />
      </div>
    </main>
  )
}
