import Link from 'next/link'
import React from 'react'

type Props = {
  document?: DocumentObject | null
}

const Navbar : React.FC<Props> = ({document}) => {
  return (
    <div className='wg-white border-b shadow-md p-2 z-10'>
        <div className='mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3'>
            <Link href="/" className='w-fit'><div className='flex items-center justify-start font-bold font-josefin text-lg'>digitalsign.</div></Link>
        </div>
    </div>
  )
}

export default Navbar