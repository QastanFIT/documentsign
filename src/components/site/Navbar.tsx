"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [is_open, setis_open] = useState(false);

  return (
    <div className='wg-white border-b shadow-md p-2 z-10'>
        <div className='mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3'>
            <Link href=""><div className='flex items-center justify-start font-bold font-josefin text-lg'>digitalsign.</div></Link>

            {/* Mobile nav */}
            <div className='sm:hidden'>
              <div className='flex justify-end'><button onClick={()=>{setis_open(true)}}><Menu className='w-4'/></button></div>
              <div className={`fixed ${is_open?'w-full max-w-full opacity-100':'w-0 max-w-0 px-0 opacity-0'} duration-200 bg-white border-b shadow-md flex flex-col right-0 top-0 gap-4 pt-4 pb-6 px-4 font-semibold`}>
                  <button onClick={()=>{setis_open(false)}}><X className='w-4'/></button>
                  <Link href="#waarom" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Waarom</Link>
                  <Link href="#hoe" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Hoe</Link>
                  <Link href="#digitaliseren" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Digitaliseren</Link>
              </div>
            </div>

            {/* Computer nav */}
            <div className='hidden sm:flex items-center justify-center gap-10 font-semibold'>
                <Link href="#waarom" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Waarom</Link>
                <Link href="#hoe" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Hoe</Link>
                <Link href="#digitaliseren" className='relative after:duration-200 after:content-[""] after:absolute after:w-0 hover:after:w-full after:h-px after:bg-black after:left-0 after:bottom-0'>Digitaliseren</Link>
            </div>

            <div className='hidden sm:flex items-center justify-end'>
              <Link href="#contacteren"><Button variant='secondary'>Contacteren</Button></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar