'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Slider from 'react-slick'

interface EventImageSliderProps {
  images: {
    src: string | StaticImageData
    alt: string
  }[]
}

const EventImageSlider = ({ images }: EventImageSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }

  if (!images || images.length === 0) return null

  return (
    <div
      className="slider-container max-w-5xl mx-auto pb-10 px-0 md:px-4
      [&_.slick-dots_li_button:before]:text-secondary!
      [&_.slick-dots_li_button:before]:opacity-30!
      [&_.slick-dots_li.slick-active_button:before]:text-secondary!
      [&_.slick-dots_li.slick-active_button:before]:opacity-100!
      [&_.slick-dots]:bottom-2"
    >
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="outline-none">
            <div className="relative aspect-4/3 md:aspect-video rounded-lg overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default EventImageSlider
