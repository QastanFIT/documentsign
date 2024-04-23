'use client'

import Navbar from '@/components/document/Navbar'
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState, useRef, useEffect, useTransition } from 'react'

import {useMutation, useQuery} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import lost from '@/assets/images/files_lost.svg'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import autoAnimate from '@formkit/auto-animate'

import SigningOptions from '@/components/document/SigningOptions'
import SideNav from '@/components/document/SideNav'
import { josefin } from '@/assets/fonts/josefin'
import Link from 'next/link'
import { Dot, Loader2, Lock, LockOpen } from 'lucide-react'
import Image from 'next/image'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useTranslations, useLocale } from 'next-intl'

// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const DocumentPage = () => {
  const locale = useLocale();
  const router = useRouter()
  const params = useParams();
  const pathname = usePathname()

  const t = useTranslations()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const codeContainer = useRef<HTMLDivElement | null>(null)

  const [numPages, setNumPages] = useState<number>(0);

  const [value, setValue] = React.useState("")

  function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // useEffect(()=>{
  //   const code = getCookie(`code_${token}`)
  //   if(code){
  //     setValue(code)
  //     deleteCookie(`code_${token}`)
  //   }
  // }, [])

  useEffect(()=>{
    const code = getCookie(`code_${token}`)
    if(value.length === 6 && code){ 
      deleteCookie(`code_${token}`)
      validatePassword()
    }
  }, [value])

  const { data:validPassword, mutate:validatePassword, isPending:isPendingValidatePassword, isError, reset } = useMutation({
    mutationKey: [`validate_password_${token}`],
    mutationFn: async () => {
      const {data} = await axios.post(`api/document/validatepassword`, {
        documenttoken: token,
        documentpassword: value
      })
      if(data.errorcode!==0){ throw new Error(data.message) }
      //createCookie(`code_${token}`, value, 1)
      refetchDocument()
      return true
    },
    onError: () => {
      setTimeout(()=>{setValue(""); reset()}, 2000)
    }
  })

  useEffect(()=>{
    const code = getCookie(`code_${token}`)
    if(code){
      setValue(code);
    }
  }, [])

  function switchLocale(locale: string) {
    //@ts-ignore
    router.push(`${pathname.replace(/^\/[a-z]{2}\b/, `/${locale}`)}?token=${token}`, { locale: locale });
    setCookie(`code_${token}`, value, 1)
  }

  const { data, refetch:refetchDocument, isFetching } = useQuery<DocumentObject | null>({
    queryKey: [`document_${token}`],
    queryFn: async () => {
      try {
        const {data} = await axios.get(`api/document?token=${token}&documentpassword=${value}`)   
        try { 
          const nextLocale = data.oCurrentRecipient.language === 3 ? 'en' : (data.oCurrentRecipient.language === 5 ? 'fr' : 'nl')   
          if(locale !== nextLocale){
            switchLocale(nextLocale)
          }       
        } catch(e){}
        return data
      } catch (error) {
        return null
      }
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false
  })

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    codeContainer.current && autoAnimate(codeContainer.current)
  }, [codeContainer])

  return (
    <>
    <div className='flex flex-col h-full'>
      <Navbar document={data}/>

      {!validPassword 
      ?
      <main className='bg-white h-full flex flex-col justify-center items-center bg-gradient-to-bl from-[#91c8ed2d] via-[#fa9eed2d] to-[#ff7b003d]'>

        <div ref={codeContainer} className='bg-white rounded-xl border shadow-lg p-10 flex flex-col justify-center items-center'>
          <div className='w-12 min-h-[48px] h-12 bg-primary flex justify-center items-center text-white mb-10 rounded-lg'>{value.length < 6 ? <Lock className='w-6 h-6'/> : <LockOpen className="w-6 h-6"/>}</div>
          <p className='text-3xl font-bold'>{t('Voer uw code in')}</p>
          <p className='text-neutral-600 mt-1 text-center'>{t('We hebben u een mail gestuurd met uw code')}</p>

          <div className='mt-10'>
          <InputOTP maxLength={6} disabled={isError || isPendingValidatePassword} value={value} onChange={(value) => setValue(value)}>
            <InputOTPGroup className='gap-1 sm:gap-4'>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          </div>

          {value.length === 6 && <Button disabled={isPendingValidatePassword || isError} onClick={()=>{ validatePassword() }} variant={!isError ? 'default' : 'destructive'} className={`${!isPendingValidatePassword ? 'px-10 max-w-[160px]' : 'h-10 p-0 max-w-[40px]'} w-full duration-200 whitespace-nowrap mt-10`}>{!isPendingValidatePassword ? (!isError ? t('Ga verder') : t('Foutieve code')) : <Loader2 className='w-4 h-4 animate-spin'/>}</Button>}
        </div>
      </main>
      :
      <main className='bg-slate-50 h-full flex flex-col items-center'>
        
        {(!token || (!data && !isFetching)) &&
        <div className='h-full w-full grid grid-cols-2'>
          <div className='flex justify-center mt-16 lg:mt-32'>
            <div className='w-5/6'>
              <h2 className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}><span className='text-neutral-800'>{t('Sorry')}</span>, {t('dit document kon niet worden gevonden')}</h2>
              <p className='mt-4 text-neutral-600'>Het document waar u naar opzoek was is niet gevonden.</p>

              <div className='mt-12 flex items-center gap-2'>
                <Link href="/" className='text-neutral-300 hover:text-neutral-700 hover:underline duration-200'>{t('Terug naar hoofdpagina')}</Link>
                <Dot className='text-neutral-300'/>
                <Link href="/" className='text-neutral-300 hover:text-neutral-700 hover:underline duration-200'>{t('Qastan bezoeken')}</Link>
              </div>
            </div>
          </div>
          <div>
            <Image className='h-1/2 mt-16 lg:mt-32' src={lost} alt="not found" />
          </div>
        </div>
        }

        {(token && (data || isFetching)) && 
        <div className='flex h-full w-full relative'>

          {/* Side nav */}
          <SideNav data={data}/>

          {/* Content  */}
          <div className='flex justify-center w-full max-h-[calc(100vh-45px)] overflow-auto'>

            {/* Menu signing */}
            {data && <SigningOptions refetch={()=>{refetchDocument()}} data={data} password={value} token={token}/>}

            {/* Document preview */}
            <div className='max-w-[100dvw] overflow-auto mt-10 sm:px-10 w-fit mx-4'>
            {data && 
            <Document file={`data:application/pdf;base64,${data.document}`} className='max-h-full' onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} className='bg-white w-full min-w-full mb-4 shadow-xl shadow-slate-200 rounded-lg overflow-hidden'/>
              ))}
            </Document>
            }
            </div>

          </div>

        </div>
        }

      </main>
      }
    </div>
    </>
  )
}

export default DocumentPage