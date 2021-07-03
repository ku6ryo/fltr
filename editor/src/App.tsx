import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import style from "./App.module.scss"
import { VideoStreamFilter } from "./VideoStreamFilter"
// import videoSrc from "./videos/presentation.mp4"
// import videoSrc from "./videos/operator.mp4"
import videoSrc from "./videos/videochat.mp4"

export function App () {
  const [filter, setFilter] = useState<VideoStreamFilter | null>(null)
  const onVideoLoaded = (e: SyntheticEvent<HTMLVideoElement>) => {
    if (!filter) {
      setFilter(new VideoStreamFilter(e.currentTarget))
    }
  }
  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        if (filter) {
          filter.setFaceTexture(e.target.result as ArrayBuffer)
        }
      }
    }
    reader.readAsArrayBuffer(file)
  }
  return (
    <div
      onDrop={onFileDrop}
      onDragOver={e => { e.preventDefault() }}
    >
      <video
        src={videoSrc}
        autoPlay={true}
        onCanPlay={onVideoLoaded}
        className={style.video}
        loop={true}
      ></video>
    </div>
  )
}