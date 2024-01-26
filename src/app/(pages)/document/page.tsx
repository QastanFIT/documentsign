'use client'

import Navbar from '@/components/document/Navbar'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import {useQuery} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import lost from '../../../assets/images/files_lost.svg'

import * as webeid from "../../../lib/web-eid"

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import SigningOptions from '@/components/document/SigningOptions'
import SideNav from '@/components/document/SideNav'
import { josefin } from '../../../assets/fonts/josefin'
import Link from 'next/link'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const DocumentPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [numPages, setNumPages] = useState<number>(0);

  const { data, refetch:refetchDocument, isFetching } = useQuery<DocumentObject | null>({
    queryKey: [`document_${token}`],
    queryFn: async () => {
      try {
        const {data} = await axios.get(`api/document?token=${token}`)
        console.log(data)
        //data.document = obj.base
        return data
      } catch (error) {
        return null
      }
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false
  })

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };


  return (
    <>
    <div className='flex flex-col h-full'>
      <Navbar document={data}/>
      <main className='bg-slate-50 h-full flex flex-col items-center'>
        
        {(!token || (!data && !isFetching)) &&
        <div className='h-full w-full grid grid-cols-2'>
          <div className='flex justify-center mt-16 lg:mt-32'>
            <div className='w-5/6'>
              <h2 className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}><span className='text-neutral-800'>Sorry</span>, dit document kon niet worden gevonden</h2>
              <p className='mt-4 text-neutral-600'>Het document waar u naar opzoek was is niet gevonden.</p>

              <div className='mt-12 flex items-center gap-2'>
                <Link href="/" className='text-neutral-300 hover:text-neutral-700 hover:underline duration-200'>Terug naar hoofdpagina</Link>
                <Dot className='text-neutral-300'/>
                <Link href="/" className='text-neutral-300 hover:text-neutral-700 hover:underline duration-200'>Qastan bezoeken</Link>
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
            {data && <SigningOptions refetch={()=>{refetchDocument()}} data={data}/>}

            {/* Document preview */}
            <div className='mt-10 px-10 w-fit mx-4'>
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
    </div>
    </>
  )
}

export default DocumentPage