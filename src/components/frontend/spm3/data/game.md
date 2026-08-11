Here are the updated **PRD** and **TRD** for **TEM ACADEMICS HUB GAME**, specifically tailored for a **monochrome (Black & White)** aesthetic paired with **DM Sans** typography.

---

# Product Requirement Document (PRD)

## 1. Project Overview

* **Product Name:** TEM ACADEMICS HUB GAME
* **Product Type:** Host-Driven Web Presentation Game
* **Design System:** High-contrast Monochrome (Pure Black `#000000`, Pure White `#FFFFFF`, and Grays)
* **Typography:** DM Sans (Clean, modern, geometric sans-serif)
* **Primary Use Case:** Real-time icebreakers and trivia rounds hosted over Google Meet for the Academics Hub community.

---

## 2. Design & Aesthetics Philosophy

* **Visual Theme:** Minimalist, editorial monochrome. Pure black and white base with bold borders, high-contrast states, and crisp typography to make emojis pop without color noise.
* **Font Family:** `DM Sans` for all headers, UI labels, timer displays, and body copy.
* **Visibility:** Optimized for crystal-clear legibility across high-res laptop displays and compressed Google Meet video streams.

---

## 3. Key Target Features

### 3.1. Emoji Stage & Reveal Mechanism

* **Monochrome Card Deck:** Crisp white cards on dark backgrounds (or vice-versa), bounded by high-contrast `1px` or `2px` black/white borders.
* **DM Sans Typography:** Clean headers and subtle category badges in `DM Sans` (`font-medium`, `tracking-wider`).
* **Answer Masking:** Smooth flip or fade reveal triggered by clicking `Reveal` or hitting `Spacebar`.

### 3.2. Host Control Bar

* **Minimalist Timer:** A monochrome circular or numeric countdown display using `DM Sans` (`font-mono` / tabular figures for zero jitter during countdowns).
* **Control Actions:** High-contrast outline buttons for `Previous`, `Next`, `Shuffle`, and `Reveal`.

### 3.3. Scoreboard (Sidebar Overlay)

* **High-Contrast Score Tracker:** Dark/Light mode toggleable sidebar.
* **Quick Adjusters:** $+1$, $+5$, and $-1$ buttons in stark black-and-white button styles.

---

---

# Technical Requirement Document (TRD)

## 1. Design Tokens & Styling Specification

### Typography (`DM Sans`)

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

:root {
  --font-dm-sans: 'DM Sans', sans-serif;
  
  /* Black & White Color Palette */
  --bg-primary: #000000;
  --bg-card: #09090b;
  --border-color: #27272a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  
  --button-bg: #ffffff;
  --button-text: #000000;
  --button-hover: #e4e4e7;
}

```

---

## 2. Updated Tech Stack

| Layer | Technology & Choice |
| --- | --- |
| **Framework** |  React + Vite |
| **Styling** | Tailwind CSS v4 |
| **Font Family** | `next/font/google` loading **DM Sans** |
| **UI Components** | Custom Radix/Shadcn primitives styled in pure B&W (`bg-black`, `bg-white`, `border-zinc-800`) |
| **Animations** | Framer Motion (monochrome flip/spring transitions) |

---

## 3. Core Component Layout (Tailwind & DM Sans Example)

### `EmojiStage.tsx`

```tsx
import { motion } from "framer-motion";

interface EmojiStageProps {
  category: string;
  emojis: string;
  answer: string;
  isRevealed: boolean;
  onReveal: () => void;
}

export function EmojiStage({
  category,
  emojis,
  answer,
  isRevealed,
  onReveal,
}: EmojiStageProps) {
  return (
    <div className="flex flex-col items-center justify-center font-['DM_Sans'] min-h-[60vh] bg-black text-white p-6">
      {/* Category Pill */}
      <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold border border-zinc-800 px-4 py-1.5 rounded-full mb-8">
        {category}
      </span>

      {/* Main Emoji Card */}
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center shadow-2xl flex flex-col items-center justify-center space-y-8">
        <div className="text-5xl sm:text-7xl md:text-8xl tracking-widest select-none">
          {emojis}
        </div>

        {/* Answer Mask/Reveal */}
        <div className="w-full pt-4">
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-black font-bold text-2xl md:text-3xl py-4 px-6 rounded-xl border border-white"
            >
              {answer}
            </motion.div>
          ) : (
            <button
              onClick={onReveal}
              className="w-full bg-transparent hover:bg-zinc-900 text-zinc-300 font-medium border border-zinc-700 border-dashed py-4 px-6 rounded-xl transition-all duration-200 cursor-pointer text-sm tracking-wide"
            >
              Click or Press Space to Reveal Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

```

---

## 4. Responsive Viewport Strategy (B&W Edition)

* **Mobile Viewport ($< 768\text{px}$):**
* Typography downscales gracefully while keeping emojis large ($3\text{rem}\text{--}4\text{rem}$).
* Scoreboard switches to a black slide-up sheet with white text.


* **Desktop Presentation ($> 1024\text{px}$):**
* Deep black background (`#000000`) with high-contrast white text to eliminate glare during screen shares.
* Sidebar control panel stays locked on the right in pure dark mode styling.