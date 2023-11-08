'use client'

import Navbar from '@/components/document/Navbar'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

import {obj} from '../../../base'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Mail, MonitorSmartphone, PenTool, X } from 'lucide-react';
import { josefin } from '@/app/layout'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import SigningOptions from '@/components/document/SigningOptions'
import SideNav from '@/components/document/SideNav'
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js',import.meta.url,).toString();

const DocumentPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [numPages, setNumPages] = useState<number>(0);

  const { data, refetch:refetchDocument } = useQuery<DocumentObject | null>({
    queryKey: [`document_${token}`],
    queryFn: async () => {
      try {
        const {data} = await axios.get(`api/document?token=${token}`)
        data.document = obj.base
        return data
      } catch (error) {
        return null
      }
    },
    enabled: !!token
  })

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className='flex flex-col h-full'>
      <Navbar document={data}/>
      <main className='bg-slate-50 h-full flex flex-col items-center'>

        

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

      </main>
    </div>
  )
}

export default DocumentPage