import './globals.css'
import { Josefin_Sans } from 'next/font/google'

import Providers from '@/providers/query-provider'

export const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl">
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
