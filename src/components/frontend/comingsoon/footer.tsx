import React from 'react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'

const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-100 text-center space-y-8 bg-zinc-50/50">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        <Link
          href={CONTACT_INFO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          Instagram
        </Link>
        <Link
          href={CONTACT_INFO.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          YouTube
        </Link>
        <Link
          href={CONTACT_INFO.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          TikTok
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-[11px] text-zinc-500 font-medium">
          Copyright © {new Date().getFullYear()}{' '}
          <span className="text-secondary font-bold">Prime Counsel</span>. All Rights Reserved.
        </p>
        {/* <p className="text-[9px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
          Designed by <span className="text-zinc-600">Godspower Similoluwa</span>
        </p> */}
      </div>
    </footer>
  )
}

export default Footer
