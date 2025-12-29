import type { Metadata } from 'next'
import { Playfair_Display, Lato, Dancing_Script } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Enchanted Oven | Premium Boutique Bakery',
  description: 'Where Every Bake Begins with a Little Magic. Custom cakes, pastries, and more.',
}

import FlyingFairy from '@/components/FlyingFairy';
import FairyDust from '@/components/FairyDust';
import DreamDustCursor from '@/components/DreamDustCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${dancing.variable}`}>
      <body>
        <FairyDust />
        <DreamDustCursor />
        <FlyingFairy />
        <div id="cursor-root"></div>
        {children}
      </body>
    </html>
  )
}
