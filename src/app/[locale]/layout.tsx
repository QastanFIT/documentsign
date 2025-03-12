import './globals.css'
import Providers from '@/providers/query-provider'
import i18nConfig from '@/i18nConfig'
import { Metadata } from 'next';
import { dir } from 'i18next';
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import NotFound from './not-found';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { 
    locale: string
  };
}

export const metadata: Metadata = {
  title: 'DigitalSign | Makkelijk Digitaal Signeren',
  description: 'Onderteken je documenten waar je maar wil en wanneer je maar wil, dankzij DigitalSign van Qastan.',
}


export function generateStaticParams() {
  const locales = i18nConfig.locales.map(locale => ({ locale }));
  return locales
}

const i18nNamespaces = ['document'];

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params.locale;

  const { resources } = await initTranslations(locale, i18nNamespaces);

  if (!i18nConfig.locales.includes(locale)) {
    <NotFound />
  }

  return (
    // <html lang={locale} dir={dir(locale)}>
    //   <body suppressHydrationWarning={true}>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <Providers locale={locale}>
          {children}
        </Providers>
      </TranslationsProvider>
    //   </body>
    // </html>
  )
}
