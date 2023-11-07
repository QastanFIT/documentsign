import Navbar from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { josefin } from "./layout";
import bg from '../assets/images/home_bg.jpg'
import preview from '../assets/images/preview_signed.jpg'
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Socials from "@/components/site/Socials";
import ContactHeader from "@/components/site/home/ContactHeader";

export default function Home() {
  return (
    <>
    <Navbar />
    
    <div className="grid lg:grid-cols-2 h-[90vh] bg-slate-50">

      <div className="flex justify-center">
        <div className="w-5/6 mt-16 lg:mt-32">
          <h1 className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}>Onderteken je documenten met <span className="text-neutral-800">DigitalSign</span><br></br> van Qastan.<br></br>Snel, eenvoudig en overal!</h1>

          <ContactHeader />

          <p className="mt-10 leading-relaxed text-neutral-600">Onderteken je documenten waar je maar wil en wanneer je maar wil, dankzij DigitalSign van Qastan. Verspil geen <strong className="italic">kostbare tijd</strong> door te wachten op de papierstroom, maar verstuur en ontvang de <strong className="italic">digitale handtekening</strong> binnen de vijf minuten. Maak als gebruiker zelf de keuze uit verschillende, eenvoudige verificatiemethodes.</p>
        </div>

      </div>

      <div className="bg-orange-600 overflow-hidden mt-16 lg:mt-0">
        <Image src={bg} alt="background" className="object-cover h-full w-full"/>
      </div>
    </div>

    <div className="pt-32 pb-20 mx-4" id="waarom">
      <div className="max-w-7xl w-full mx-auto">
        <h3 className={`${josefin.className} text-4xl font-semibold text-center mb-16`}>Efficiënt en juridisch waterdicht</h3>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="col-span-full bg-orange-500/80 rounded-2xl p-6 text-white flex gap-10">
            <div className="max-w-2xl">
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>Hoge graad van efficiëntie</h4>
              <p>Verstuur binnen één minuut je te ondertekenen document naar wie je maar wil. De ontvanger kiest zelf de methode en stuurt binnen twee minuten het ondertekende document terug.</p>
            </div>
            <div className="w-1/2 bg-white translate-y-6 rounded-t-lg mr-12 hidden sm:flex justify-center">
              <Image src={preview} alt="preview" className="max-h-[400px] w-auto"/>
            </div>     
          </div>  

          <div className="bg-yellow-500/80 rounded-2xl p-6 text-white flex">
            <div>
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>Directe integratie binnen uw systeem</h4>
              <p>We integreren onze tool in uw toepassing zodat u rechtstreeks documenten kunt selecteren vanuit uw DMS of ERP pakket. Beheer de ondertekenede documenten in een makkelijk overzicht.</p>
            </div>   
          </div> 

          <div className="bg-blue-500/80 rounded-2xl p-6 text-white flex">
            <div>
              <h4 className={`${josefin.className} text-2xl font-semibold mb-2`}>Wettelijk in orde</h4>
              <p>Koppel veilig de eigenaar van het document aan de ondertekenaar. Door middel van verschillende methodes om te ondertekenen kunnen we de identiteit van de ondertekenaar verifiëren en garanderen.</p>
            </div>    
          </div> 

        </div>
      </div>
      
    </div>

    <div className="pt-20 pb-20 bg-slate-50 flex justify-center" id="hoe">
      <div className="max-w-7xl w-full mx-4">
        <div className="mb-16">
        <h2 className={`${josefin.className} text-4xl font-semibold`}>Hoe DigitalSign werkt</h2>
        <p className={`${josefin.className} my-1 opacity-75`}>In 3 eenvoudige stappen</p>
        </div>
        

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600`}>1</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>Uploaden</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">Kies en upload uw document, selecteer de ondertekenaar(s) en verstuur het document.</p>
          </div>

          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600/80`}>2</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>Ondertekenen</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">De ondertekenaar kan veilig, efficiënt en legaal het document ondertekenen</p>
          </div>

          <div>
            <p className={`${josefin.className} text-5xl md:text-9xl font-bold text-orange-600/60`}>3</p>
            <p className={`${josefin.className} text-lg font-bold text-neutral-700`}>Opvolgen</p>
            <div className="h-[2px] w-10 bg-orange-600/50 my-2"></div>
            <p className="leading-relaxed opacity-75">Volg uw verschillende documenten op zodat u te allen tijd weet in welke status uw documenten zich bevinden.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-20 pb-32 mx-4" id="digitaliseren">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        <h3 className={`${josefin.className} text-4xl font-semibold text-center mb-16`}>Wilt u meer digitaliseren?</h3>
        
        <div className="flex flex-col gap-10 max-w-2xl">
        <p><strong>Optimaliseer</strong> dit proces verder door te profiteren van de geavanceerde mogelijkheden van onze software <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="underline text-orange-600">FITdoc</Link>. Met deze tool kun je een <strong>geautomatiseerde workflow</strong> opzetten op basis van verschillende parameters, zoals documenttype en metadata, zoals bijvoorbeeld de betrokken contactpersoon.</p>
      
        <p>De <strong>kracht</strong> van <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="underline text-orange-600">FITdoc</Link> ligt in het feit dat het in staat is om een naadloze <strong>verbinding</strong> te leggen tussen <strong>documenten</strong> en <strong>acties</strong>. Stel je voor dat wanneer een document van het juiste type wordt toegevoegd, het systeem automatisch een DigitalSign-proces activeert. Dit betekent dat als gebruiker je enkel nog hoeft te controleren welke documenten al zijn ondertekend en welke nog niet. Dit <strong>bespaart</strong> niet alleen <strong>tijd</strong>, maar minimaliseert ook <strong>menselijke fouten</strong> en versnelt de doorlooptijd van belangrijke processen.</p>

        <p>De <strong>automatisering</strong> via <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="underline text-orange-600">FITdoc</Link> garandeert niet alleen efficiëntie, maar ook nauwkeurigheid. Door de integratie van DigitalSign in de workflow wordt het gehele proces gestroomlijnd en kunnen gebruikers zich richten op de essentiële aspecten van documentbeheer, zonder tijd te verspillen aan repetitieve handelingen. Dit geeft een gevoel van gemoedsrust omdat de workflow betrouwbaar en consistent is, en tegelijkertijd het volledige overzicht behouden blijft.</p>

        <p>Met onze <strong>geautomatiseerde oplossing</strong> hoef je je <strong>geen zorgen</strong> te maken over handmatige controles of het bijhouden van de status van documenten. <Link href="https://qastan.be/nl/oplossingen/#digitaliseren" className="underline text-orange-600">FITdoc</Link> neemt deze taken op zich, waardoor jij je kunt concentreren op het inhoudelijke werk en de kernaspecten van jouw taken. Dit brengt niet alleen gemak met zich mee, maar optimaliseert ook de workflow, waardoor jouw team zich kan <strong>focussen</strong> op wat er echt toe doet.</p>
        </div>
      </div>
    </div>

    <div className="pt-32 pb-32 bg-orange-500/80 text-white relative overflow-hidden flex justify-center" id="contacteren">
      <div className="max-w-7xl w-full mx-4 flex gap-4 flex-col items-center relative z-[1]">
        <h2 className={`${josefin.className} text-4xl font-semibold`}>Neem contact op!</h2>
        <p>Aarzel zeker niet om contact op te nemen met ons door middel van deze mogelijkheden</p>
        <div className="flex gap-4 flex-wrap">
          <Link href="tel:+051310744"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><Phone className="w-4"/><p>+051 31 07 44</p></button></Link>
          <Link href="mailto:info@qastan.be"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><Mail className="w-4"/><p>info@qastan.be</p></button></Link>
          <Link href="https://maps.google.com/?ll=50.84795247326319,3.2698763153448747" target="_blank" rel="noopener noreferrer"><button className="bg-white rounded-full text-black min-h-[40px] px-4 font-medium flex gap-2 items-center hover:scale-105 hover:shadow-sm duration-200"><MapPin className="w-4"/><p>Open Maps</p></button></Link>
        </div>
      </div>

      <div className="absolute top-0 h-full w-full">
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
