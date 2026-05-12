'use client'

import React from 'react'

interface Video {
  url: string
  title?: string
}

interface EventVideoGalleryProps {
  videos: Video[]
}

const EventVideoGallery: React.FC<EventVideoGalleryProps> = ({ videos }) => {
  if (!videos || videos.length === 0) return null

  // Function to extract Vimeo ID from URL
  const getVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(?:video\/)?(\d+)/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  return (
    <div className={`grid gap-6 ${videos.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
      {videos.map((video, index) => {
        const vimeoId = getVimeoId(video.url)
        
        if (!vimeoId) return null

        return (
          <div key={index} className="group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-navy/5 shadow-md">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?dnt=1&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title || `Event Video ${index + 1}`}
                loading="lazy"
              />
            </div>
            {video.title && (
              <p className="mt-3 font-body text-sm font-semibold text-navy uppercase tracking-wider">
                {video.title}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EventVideoGallery
