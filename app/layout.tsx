import type { Metadata } from 'next';
import { Archivo_Black, DM_Sans } from 'next/font/google';
import './globals.css';

const displayFont = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Senado 26 — Radar político brasileiro',
  description: 'Leitura interativa das eleições para o Senado Federal em 2026.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`} style={{ colorScheme: "dark" }}>
      <body className="touch-manipulation antialiased">{children}</body>
    </html>
  )
}
