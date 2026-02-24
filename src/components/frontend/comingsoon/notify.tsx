import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Notify = () => {
  return (
    <section id="notify" className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="container max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <span className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] block">
            When We Go Live
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase grayscale">
            Notify Me
          </h2>
          <div className="w-px h-12 bg-zinc-200 mx-auto mt-6" />
        </div>

        <div className="space-y-8 max-w-xl mx-auto">
          <p className="text-xl font-bold tracking-tight text-zinc-800">
            Sign up to be the first to know when we launch.
          </p>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Enter Your Email Here:
            </label>
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="name@example.com"
                className="h-14 bg-white border-zinc-200 text-center text-lg focus:ring-secondary focus:border-secondary rounded-none shadow-sm"
              />
              <Button className="h-14 bg-secondary hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-none shadow-xl shadow-secondary/20">
                Notify Me!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Notify
