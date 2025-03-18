import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/images/logo.svg'

type Props = {
  document?: DocumentObject | null
}

const Navbar : React.FC<Props> = ({document}) => {
  return (
    <div className='z-10 p-2 border-b shadow-md wg-white'>
        <div className='grid grid-cols-2 mx-auto max-w-7xl sm:grid-cols-3'>
            <Link href="/" className='w-fit'><div className='flex items-center justify-start text-lg font-bold font-josefin'><Image src={logo} className='h-7 w-fit' alt="Logo digitalsign Qastan"/></div></Link>
        </div>
    </div>
  )
}

export default Navbar