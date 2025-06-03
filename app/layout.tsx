import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
})

import './globals.css';

export const metadata: Metadata = {
  title: 'Projeção de Senadores 2026',
  description: 'Projeção de Senadores 2026',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geist.className}`}>
      <body>{children}</body>
    </html>
  )
}
