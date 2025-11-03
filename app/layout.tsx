import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '🚀 Test Web App',
  description: 'Una web de prueba con emojis para Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

