"use client"

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

const ContactHeader = () => {
  const t = useTranslations()
    const [subject, setsubject] = useState('');

  return (
    <div className="p-1 bg-white w-fit rounded-full border mt-10 flex">
        <input value={subject} onChange={({currentTarget})=>{setsubject(currentTarget.value)}} placeholder={`${t('Uw onderwerp')}...`} type="text" className="pl-4 focus:outline-none rounded-full"/>
        <Link href={`mailto:info@qastan.be?subject=${subject}`}><Button className="sm:px-10">{t('Contacteren')}</Button></Link>
    </div>
  )
}

export default ContactHeader