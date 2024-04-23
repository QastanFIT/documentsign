"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/images/logo.svg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Navbar = () => {
  const t = useTranslations()
  const [is_open, setis_open] = useState(false);

  return (
    <nav className='wg-white border-b shadow-md p-2 z-10'>
        <div className='mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3'>
            <Link href="" className='w-fit flex items-center'><div className='flex font-bold font-josefin text-lg'><Image src={logo} className='h-7 w-fit' alt="Logo digitalsign Qastan"/></div></Link>

            {/* Mobile nav */}
            <div className='sm:hidden'>
              <div className='flex justify-end'><button onClick={()=>{setis_open(true)}}><Menu className='w-7'/></button></div>
              <div className={`fixed ${is_open?'w-full max-w-full opacity-100 px-4':'w-0 max-w-0 px-0 opacity-0'} duration-200 bg-white border-b shadow-md flex flex-col right-0 top-0 gap-4 pt-4 pb-6  font-semibold`}>
                  <button onClick={()=>{setis_open(false)}}><X className='w-7'/></button>
                  <Link href="#waarom" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Waarom')}</Link>
                  <Link href="#hoe" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Hoe')}</Link>
                  <Link href="#digitaliseren" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Digitaliseren')}</Link>
              </div>
            </div>

            {/* Computer nav */}
            <div className='hidden sm:flex items-center justify-center gap-10 font-semibold'>
                <Link href="#waarom" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Waarom')}</Link>
                <Link href="#hoe" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Hoe')}</Link>
                <Link href="#digitaliseren" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Digitaliseren')}</Link>
            </div>

            <div className='hidden sm:flex items-center justify-end'>
              <Link href="#contacteren"><Button variant='secondary'>{t('Contacteren')}</Button></Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar