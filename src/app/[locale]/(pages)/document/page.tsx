'use client'

import Navbar from './(components)/navbar'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'

import {useMutation, useQuery} from '@tanstack/react-query'
import axios from 'axios'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import autoAnimate from '@formkit/auto-animate'

import SigningOptions from '@/app/[locale]/(pages)/document/(components)/signing-options'
import SideNav from './(components)/sidenav'
import { Loader2, Lock, LockOpen } from 'lucide-react'
import { Document as Doc, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { deleteCookie, getCookie, setCookie } from '@/lib/cookie'
import Loading from './(components)/loading'
import ErrorComponent from './(components)/error'
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig'
import { CONFIG } from '@/constants/config'
import { Toaster } from 'react-hot-toast'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function DocumentPage()  {
  const { t } = useTranslation();
  const locale = i18nConfig.defaultLocale;
  
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const codeContainer = useRef<HTMLDivElement | null>(null)

  const [numPages, setNumPages] = useState<number>(0);

  const [value, setValue] = React.useState("")
  
  function switchLocale(locale: string) {
    router.push(`${pathname.replace(/^\/[a-z]{2}\b/, `/${locale}`)}?token=${token}`, { 
      // @ts-ignore
      locale: locale 
    });
    setCookie(`code_${token}`, value, 1)
  }

  const { data:documentInfo, isLoading:isLoadingDocumentInfo } = useQuery<DocumentInfo>({
    queryKey: ['document-info'],
    queryFn: async () => {
      const { data } = await axios.get(`${CONFIG.NEXT_PUBLIC_API}documentinfo`, {
        params: {
          documenttoken: token
        }
      })
      return data;
    }
  })

  useEffect(()=>{
    if(documentInfo) {
      if(documentInfo?.object?.emailcode === false){ 
        refetchDocument() 
      }
    }
  }, [documentInfo])
  
  useEffect(()=>{
    const code = getCookie(`code_${token}`)
    if(value.length === 6 && code){ 
      deleteCookie(`code_${token}`)
      validatePassword()
    }
  }, [value])

  const { mutate:validatePassword, isPending:isPendingValidatePassword, isError, reset } = useMutation({
    mutationKey: [`validate_password_${token}`],
    mutationFn: async () => {
      const {data} = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/validatepassword`, {
        documenttoken: token,
        documentpassword: value
      })
      if(data.errorcode!==0){ throw new Error(data.content) }
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

  const { data:documentContent, mutate:refetchDocument, isError:isErrorDocument, isPending:isGettingDocumentContent } = useMutation<DocumentObject | null>({
    mutationKey: [`document_${token}`],
    mutationFn: async () => {
      const {data} = await axios.get(`${CONFIG.NEXT_PUBLIC_API}document?documenttoken=${token}&documentpassword=${value}`)   
      if(data.errorcode!==0){
        throw new Error(data.content)
      }
      const content = data?.content?.document
      try { 
        const nextLocale = content.oCurrentRecipient.language === 3 ? 'en' : (content.oCurrentRecipient.language === 5 ? 'fr' : 'nl')   
        if(locale !== nextLocale){
          switchLocale(nextLocale)
        }       
      } catch(e){}
      return content
    },
    retry: false,
  })

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    codeContainer.current && autoAnimate(codeContainer.current)
  }, [codeContainer])

  if(!token){ return <>Invalid token</>}
  if(isErrorDocument){ return <ErrorComponent /> }
  if(isLoadingDocumentInfo || isGettingDocumentContent) {
    return <Loading />
  } 

  return (
    <>
    <Toaster />
    <div className='flex flex-col h-full'>
      <Navbar document={documentContent}/>

      {!documentContent 
      ?
      <main className='bg-white h-full flex flex-col justify-center items-center bg-gradient-to-bl from-[#91c8ed2d] via-[#fa9eed2d] to-[#ff7b003d]'>

        <div ref={codeContainer} className='flex flex-col items-center justify-center p-10 bg-white border shadow-lg rounded-xl'>
          <div className='w-12 min-h-[48px] h-12 bg-primary flex justify-center items-center text-white mb-10 rounded-lg'>{value.length < 6 ? <Lock className='w-6 h-6'/> : <LockOpen className="w-6 h-6"/>}</div>
          <p className='text-3xl font-bold'>{t('Voer uw code in')}</p>
          <p className='mt-1 text-center text-neutral-600'>{t('We hebben u een mail gestuurd met uw code')}</p>

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
      <main className='flex flex-col items-center h-full bg-slate-50'>
        {(documentContent) && 
        <div className='relative flex w-full h-full'>

          {/* Side nav */}
          <SideNav data={documentContent}/>

          {/* Content  */}
          <div className='flex justify-center w-full max-h-[calc(100vh-45px)] overflow-auto'>

            {/* Menu signing */}
            {/* Client side only */}
            {typeof navigator !== "undefined" &&
              <SigningOptions refetch={()=>{refetchDocument()}} data={documentContent} password={value} token={token}/>
            }
           

            {/* Document preview */}
            <div className='max-w-[100dvw] overflow-auto mt-10 sm:px-10 w-fit mx-4'>
            
            <Doc file={`data:application/pdf;base64,${documentContent.document}`} className='max-h-full' onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} className='w-full min-w-full mb-4 overflow-hidden bg-white rounded-lg shadow-xl shadow-slate-200'/>
              ))}
            </Doc>
            
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
