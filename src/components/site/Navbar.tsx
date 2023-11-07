import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className='wg-white border-b shadow-md p-2 z-10'>
        <div className='mx-auto max-w-7xl grid grid-cols-3'>
            <Link href=""><div className='flex items-center justify-start font-bold font-josefin text-lg'>digitalsign.</div></Link>
            <div className='flex items-center justify-center gap-10 font-semibold'>
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