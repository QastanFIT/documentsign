import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

const Socials = () => {
  return (
    <div className='p-6 flex items-center justify-between'>
        <div className='flex gap-4'>
            <Link href="https://www.facebook.com/QastanIT/" target="_blank" rel="noopener noreferrer"><button className='h-10 w-10 flex justify-center items-center border rounded-full text-black group hover:text-orange-600'><Facebook className='w-5 fill-black stroke-none group-hover:fill-orange-600'/></button></Link>
            <Link href="https://www.instagram.com/qastan_it/" target="_blank" rel="noopener noreferrer"><button className='h-10 w-10 flex justify-center items-center border rounded-full text-black group hover:text-orange-600'><Instagram className='w-5'/></button></Link>
            <Link href="https://www.linkedin.com/company/qastan-it/mycompany/" target="_blank" rel="noopener noreferrer"><button className='h-10 w-10 flex justify-center items-center border rounded-full text-black group hover:text-orange-600'><Linkedin className='w-5 fill-black stroke-none group-hover:fill-orange-600'/></button></Link>
        </div>
        <p className='opacity-50 font-medium'>Copyright Qastan {format(new Date, "yyyy")}</p>
    </div>
  )
}

export default Socials