import './globals.css'


import Providers from '@/providers/query-provider'

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
