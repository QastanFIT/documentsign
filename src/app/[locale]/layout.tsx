import {NextIntlClientProvider, useMessages} from 'next-intl';
import './globals.css'

import Providers from '@/providers/query-provider'

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <Providers locale={locale}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
