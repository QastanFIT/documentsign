"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'

const ContactHeader = () => {
    const [subject, setsubject] = useState('');

  return (
    <div className="p-1 bg-white w-fit rounded-full border mt-10 flex">
        <input value={subject} onChange={({currentTarget})=>{setsubject(currentTarget.value)}} placeholder="Uw onderwerp..." type="text" className="pl-4 focus:outline-none rounded-full"/>
        <Link href={`mailto:info@qastan.be?subject=${subject}`}><Button className="sm:px-10">Contacteren</Button></Link>
    </div>
  )
}

export default ContactHeader