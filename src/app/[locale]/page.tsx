import Homepage from "@/app/[locale]/(components)/homepage";
import i18nConfig from "@/i18nConfig";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  const locales = i18nConfig.locales.map(locale => ({ locale:locale }));
  locales.push({ locale: 'document' })
  return locales
}

export default function Home({params}:any) {
  if(params.locale === 'document'){
    // Redirect to homepage, locale is required.
    redirect(`/${i18nConfig.defaultLocale}`)
  }

  return (
    <Homepage />
  )
}
