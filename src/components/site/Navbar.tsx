'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/images/logo.svg'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const [is_open, setis_open] = useState(false);

  return (
    <nav className='z-10 p-2 border-b shadow-md wg-white'>
        <div className='grid grid-cols-2 mx-auto max-w-7xl sm:grid-cols-3'>
            <Link href="" className='flex items-center w-fit'><div className='flex text-lg font-bold font-josefin'><Image src={logo} className='h-7 w-fit' alt="Logo digitalsign Qastan"/></div></Link>

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
            <div className='items-center justify-center hidden gap-10 font-semibold sm:flex'>
                <Link href="#waarom" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Waarom')}</Link>
                <Link href="#hoe" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Hoe')}</Link>
                <Link href="#digitaliseren" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>{t('Digitaliseren')}</Link>
            </div>

            <div className='items-center justify-end hidden sm:flex'>
              <Link href="#contacteren"><Button variant='secondary'>{t('Contacteren')}</Button></Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar