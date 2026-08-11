'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Slider from 'react-slick'

// SPM 1.0 Images
import spm1_img1 from '@/assets/images/events/spm1/image-1.webp'
import spm1_img2 from '@/assets/images/events/spm1/image-2.webp'
import spm1_img3 from '@/assets/images/events/spm1/image-3.webp'

// SPM 2.0 Images
import spm2_img1 from '@/assets/images/events/spm2/spm-2-a.webp'
import spm2_img2 from '@/assets/images/events/spm2/spm-2-c.png'
import spm2_img3 from '@/assets/images/events/spm2/spm-2-e.webp'
import spm2_img4 from '@/assets/images/events/spm2/spm-2-b.jpeg'
import spm2_img5 from '@/assets/images/events/spm2/spm-2-d.jpeg'

const spm1Images = [
  { src: spm1_img1, alt: 'SPM 1.0 Highlight 1' },
  { src: spm1_img2, alt: 'SPM 1.0 Highlight 2' },
  { src: spm1_img3, alt: 'SPM 1.0 Highlight 3' },
]

const spm2Images = [
  { src: spm2_img1, alt: 'SPM 2.0 Highlight 1' },
  { src: spm2_img2, alt: 'SPM 2.0 Highlight 2' },
  { src: spm2_img3, alt: 'SPM 2.0 Highlight 3' },
  { src: spm2_img4, alt: 'SPM 2.0 Highlight 4' },
  { src: spm2_img5, alt: 'SPM 2.0 Highlight 5' },
]

const ImageSlider = () => {
  const [activeTab, setActiveTab] = useState<'spm1' | 'spm2'>('spm1')

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

  const currentImages = activeTab === 'spm1' ? spm1Images : spm2Images

  return (
    <div className="flex flex-col items-center w-full">
      {/* Switcher Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setActiveTab('spm1')}
          className={`px-5 sm:px-6 py-2 rounded-full font-body text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
            activeTab === 'spm1'
              ? 'bg-gold text-navy shadow-md scale-105'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          SPM 1.0
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('spm2')}
          className={`px-5 sm:px-6 py-2 rounded-full font-body text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
            activeTab === 'spm2'
              ? 'bg-gold text-navy shadow-md scale-105'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          SPM 2.0
        </button>
      </div>

      <div
        className="slider-container w-full max-w-5xl mx-auto pb-10 px-0 md:px-4
        [&_.slick-dots_li_button:before]:text-gold!
        [&_.slick-dots_li_button:before]:opacity-30!
        [&_.slick-dots_li.slick-active_button:before]:text-gold!
        [&_.slick-dots_li.slick-active_button:before]:opacity-100!
        [&_.slick-dots]:bottom-2"
      >
        <Slider key={activeTab} {...settings}>
          {currentImages.map((img, index) => (
            <div key={index} className="outline-none">
              <div className="relative aspect-4/3 md:aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl">
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
    </div>
  )
}

export default ImageSlider
