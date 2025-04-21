"use client"

import type React from "react"

import { useState } from "react"
import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadAreaProps {
  onFilesAdded: (files: File[]) => void
}

export default function UploadArea({ onFilesAdded }: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesAdded(Array.from(event.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    if (e.dataTransfer.files) {
      onFilesAdded(Array.from(e.dataTransfer.files))
    }
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
        dragOver
          ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-900/20"
          : "border-sky-200 hover:border-sky-400 bg-white dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Music className="w-12 h-12 mx-auto mb-4 text-sky-400 dark:text-sky-300" />
      <h2 className="text-xl font-semibold mb-2 text-sky-800 dark:text-sky-300">Drop your music files here</h2>
      <p className="text-sky-600 dark:text-sky-400 mb-4">or</p>
      <Button
        variant="outline"
        className="bg-white dark:bg-slate-800 border-sky-300 dark:border-slate-600 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-700"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        Select Files
      </Button>
      <input id="file-upload" type="file" accept=".mp3,.wav,.ogg,.aac,.m4a" multiple className="hidden" onChange={handleFileUpload} />
    </div>
  )
}
