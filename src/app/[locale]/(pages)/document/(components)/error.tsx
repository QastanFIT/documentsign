import { Dot } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { josefin } from '@/assets/fonts/josefin'
import lost from '@/assets/images/files_lost.svg'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Error = () => {
    const { t } = useTranslation()
    
  return (
    <div className='grid w-full h-full grid-cols-2'>
        <div className='flex justify-center mt-16 lg:mt-32'>
            <div className='w-5/6'>
                <h2 className={`${josefin.className} lg:max-w-[500px] text-3xl lg:text-6xl text-neutral-400 leading-tight font-semibold`}><span className='text-neutral-800'>{t('Sorry')}</span>, {t('dit document kon niet worden gevonden')}</h2>
                <p className='mt-4 text-neutral-600'>{t('Het document waar u naar opzoek was is niet gevonden')}</p>

                <div className='flex items-center gap-2 mt-12'>
                    <Link href="/" className='duration-200 text-neutral-400 hover:text-neutral-700 hover:underline'>{t('Terug naar hoofdpagina')}</Link>
                    <Dot className='text-neutral-300'/>
                    <Link href="/" className='duration-200 text-neutral-400 hover:text-neutral-700 hover:underline'>{t('Qastan bezoeken')}</Link>
                </div>
            </div>
        </div>
        <div>
            <Image className='mt-16 h-1/2 lg:mt-32' src={lost} alt="not found" />
        </div>
    </div>
  )
}

export default Error