'use client'

import Navbar from "@/components/site/Navbar";
import { josefin } from "@/assets/fonts/josefin";
import bg from '@/assets/images/home_bg.jpg'
import preview from '@/assets/images/preview_signed.jpg'
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Socials from "@/components/site/Socials";
import ContactHeader from "@/components/site/home/ContactHeader";
import { useTranslation } from "react-i18next";

const Homepage = () => {
    const { t } = useTranslation()
    
  return (
    <>
    <Navbar />
    
    <div className="grid lg:grid-cols-2 h-[90vh] bg-slate-50">

      <div className="flex justify-center">
        <div className="w-5/6 mt-16 lg:mt-32">
          <h1 className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}>{t('Onderteken je documenten met')} <span className="text-neutral-800">{t('DigitalSign')}</span><br></br> {t('van Qastan')}<br></br></h1><p className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}>{t('Snel, eenvoudig en overal!')}</p>

          <ContactHeader />

          <p className="mt-10 leading-relaxed text-neutral-600">{t('Onderteken je documenten waar je maar wil en wanneer je maar wil, dankzij')} <strong className="font-normal">{t('DigitalSign')}</strong> {t('van Qastan')} {t('Verspil geen')} <strong className="italic">{t('kostbare tijd')}</strong> {t('door te wachten op de papierstroom, maar verstuur en ontvang de')} <strong className="italic">{t('digitale handtekening')}</strong> {t('binnen de vijf minuten Maak als gebruiker zelf de keuze uit verschillende, eenvoudige verificatiemethodes')}</p>
        </div>

      </div>

      <div className="hidden mt-16 overflow-hidden bg-orange-600 sm:inline-block lg:mt-0">
        <Image src={bg} alt="Vrouw die digitale handtekening zet in een park" className="object-cover w-full h-full" title="Vrouw die digitale handtekening zet"/>
      </div>
    </div>

    <div className="pt-32 pb-20 mx-4" id="waarom">
      <div className="w-full mx-auto max-w-7xl">
        <h3 className={`${josefin.className} text-4xl font-semibold text-center mb-16`}>{t('Efficiënt en juridisch waterdicht')}</h3>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex gap-10 p-6 text-white col-span-full bg-orange-500/80 rounded-2xl">
            <div className="max-w-2xl">
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>{t('Hoge graad van efficiëntie')}</h4>
              <p>{t('Verstuur binnen één minuut je te ondertekenen document naar wie je maar wil De ontvanger kiest zelf de methode en stuurt binnen twee minuten het ondertekende document terug')}</p>
            </div>
            <div className="justify-center hidden w-1/2 mr-12 translate-y-6 bg-white rounded-t-lg sm:flex">
              <Image src={preview} alt="Voorbeeld van digitaal signeren applicatie" className="max-h-[400px] w-auto" title="Hoge graad van efficiëntie"/>
            </div>     
          </div>  

          <div className="flex p-6 text-white bg-yellow-500/80 rounded-2xl">
            <div>
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>{t('Directe integratie binnen uw systeem')}</h4>
              <p>{t('We integreren onze tool in uw toepassing zodat u rechtstreeks documenten kunt selecteren vanuit uw DMS of ERP pakket Beheer de ondertekenede documenten in een makkelijk overzicht')}</p>
            </div>   
          </div> 

          <div className="flex p-6 text-white bg-blue-500/80 rounded-2xl">
            <div>
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>{t('Wettelijk in orde')}</h4>
              <p>{t('Koppel veilig de eigenaar van het document aan de ondertekenaar Door middel van verschillende methodes om te ondertekenen kunnen we de identiteit van de ondertekenaar verifiëren en garanderen')}</p>
            </div>    
          </div> 

        </div>
      </div>
      
    </div>

    <div className="flex justify-center pt-20 pb-20 bg-slate-50" id="hoe">
      <div className="w-full mx-4 max-w-7xl">
        <div className="mb-16">
        <h2 className={`${josefin.className} text-4xl font-semibold`}>{t('Hoe DigitalSign werkt')}</h2>
        <p className={`${josefin.className} my-1 opacity-75`}>{t('In 3 eenvoudige stappen')}</p>
        </div>
        

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600`}>1</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>{t('Uploaden')}</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">{t('Kies en upload uw document, selecteer de ondertekenaar(s) en verstuur het document')}</p>
          </div>

          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600/80`}>2</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>{t('Ondertekenen')}</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">{t('De ondertekenaar kan veilig, efficiënt en legaal het document ondertekenen')}</p>
          </div>

          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600/60`}>3</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>{t('Opvolgen')}</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">{t('Volg uw verschillende documenten op zodat u te allen tijd weet in welke status uw documenten zich bevinden')}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-20 pb-32 mx-4" id="digitaliseren">
      <div className="flex flex-col items-center w-full mx-auto max-w-7xl">
        <h3 className={`${josefin.className} text-4xl font-semibold text-center mb-16`}>{t('Wilt u meer digitaliseren?')}</h3>
        
        <div className="flex flex-col max-w-2xl gap-10">
        <p><strong>{t('Optimaliseer')}</strong> {t('dit proces verder door te profiteren van de geavanceerde mogelijkheden van onze software')} <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="text-orange-600 underline">FITdoc</Link>. {t('Met deze tool kun je een')} <strong>{t('geautomatiseerde workflow')}</strong> {t('opzetten op basis van verschillende parameters, zoals documenttype en metadata, zoals bijvoorbeeld de betrokken contactpersoon')}</p>
      
        <p>{t('De')} <span className="font-bold">{t('kracht')}</span> {t('van')} <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="text-orange-600 underline">FITdoc</Link> {t('ligt in het feit dat het in staat is om een naadloze')} <span className="font-bold">{t('verbinding')}</span> {t('te leggen tussen')} <strong>{t('documenten')}</strong> {t('en')} <strong>{t('acties')}</strong>. {t('Stel je voor dat wanneer een document van het juiste type wordt toegevoegd, het systeem automatisch een DigitalSign-proces activeert Dit betekent dat als gebruiker je enkel nog hoeft te controleren welke documenten al zijn ondertekend en welke nog niet Dit')} <strong>{t('bespaart')}</strong> {t('niet alleen')} <strong>{t('tijd')}</strong>, {t('maar minimaliseert ook')} <strong>{t('menselijke fouten')}</strong> {t('en versnelt de doorlooptijd van belangrijke processen')}</p>

        <p>{t('De')} <strong>{t('automatisering')}</strong> {t('via')} <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="text-orange-600 underline">FITdoc</Link> {t('garandeert niet alleen efficiëntie, maar ook nauwkeurigheid Door de integratie van DigitalSign in de workflow wordt het gehele proces gestroomlijnd en kunnen gebruikers zich richten op de essentiële aspecten van documentbeheer, zonder tijd te verspillen aan repetitieve handelingen Dit geeft een gevoel van gemoedsrust omdat de workflow betrouwbaar en consistent is, en tegelijkertijd het volledige overzicht behouden blijft')}</p>

        <p>{t('Met onze')} <span className="font-bold">{t('geautomatiseerde oplossing')}</span> {t('hoef je je')} <strong>{t('geen zorgen')}</strong> {t('te maken over handmatige controles of het bijhouden van de status van documenten')} <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="text-orange-600 underline">FITdoc</Link> {t('neemt deze taken op zich, waardoor jij je kunt concentreren op het inhoudelijke werk en de kernaspecten van jouw taken Dit brengt niet alleen gemak met zich mee, maar optimaliseert ook de workflow, waardoor jouw team zich kan')} <span className="font-bold">{t('focussen')}</span> {t('op wat er echt toe doet')}</p>
        </div>
      </div>
    </div>

    <div className="relative flex justify-center pt-32 pb-32 overflow-hidden text-white bg-orange-500/80" id="contacteren">
      <div className="max-w-7xl w-full mx-4 flex gap-4 flex-col items-center relative z-[1]">
        <h2 className={`${josefin.className} text-4xl font-semibold`}>{t('Neem contact op!')}</h2>
        <p>{t('Aarzel zeker niet om contact op te nemen met ons door middel van deze mogelijkheden')}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="tel:+051310744"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><Phone className="w-4"/><p>+051 31 07 44</p></button></Link>
          <Link href="mailto:info@qastan.be"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><Mail className="w-4"/><p>info@qastan.be</p></button></Link>
          <Link href="https://maps.google.com/?ll=50.84795247326319,3.2698763153448747" target="_blank" rel="noopener noreferrer"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><MapPin className="w-4"/><p>Open Maps</p></button></Link>
        </div>
      </div>

      <div className="absolute top-0 w-full h-full">
        <div className="flex h-full">
        {Array(10).fill('').map((_, i)=>{
          return (
            <div className={`${i===0?'bg-white opacity-[15%]': i===1 ? 'bg-white/10' :'bg-white/5'} h-full w-auto aspect-square  rounded-full`} key={i}></div>
          )
        })}
        </div>
      </div>
    </div>

    <Socials />
    </>
  )
}

export default Homepage