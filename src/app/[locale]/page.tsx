import Homepage from "@/app/[locale]/(components)/homepage";
import i18nConfig from "@/i18nConfig";

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale:locale }));
}

export default function Home({params}:any) {
  return (
    <Homepage />
  )
}
