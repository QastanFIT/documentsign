import './globals.css'
import Providers from '@/providers/query-provider'
import i18nConfig from '@/i18nConfig'
import { Metadata } from 'next';
import { dir } from 'i18next';
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'DigitalSign | Makkelijk Digitaal Signeren',
  description: 'Onderteken je documenten waar je maar wil en wanneer je maar wil, dankzij DigitalSign van Qastan.',
}


export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const i18nNamespaces = ['document'];

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params.locale;

  const { resources } = await initTranslations(locale, i18nNamespaces);

  if (!i18nConfig.locales.includes(locale)) {
    <p>Not found</p>
  }

  return (
    <html lang={locale} dir={dir(locale)}>
      <body suppressHydrationWarning={true}>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <Providers locale={locale}>
          {children}
        </Providers>
      </TranslationsProvider>
      </body>
    </html>
  )
}
