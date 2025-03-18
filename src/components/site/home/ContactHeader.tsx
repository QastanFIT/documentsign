"use client"

import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next';
import Link from 'next/link'
import React, { useState } from 'react'

const ContactHeader = () => {
  const { t } = useTranslation()
    const [subject, setsubject] = useState('');

  return (
    <div className="flex p-1 mt-10 bg-white border rounded-full w-fit">
        <input value={subject} onChange={({currentTarget})=>{setsubject(currentTarget.value)}} placeholder={`${t('Uw onderwerp')}...`} type="text" className="pl-4 rounded-full focus:outline-none"/>
        <Link href={`mailto:info@qastan.be?subject=${subject}`}><Button className="sm:px-10">{t('Contacteren')}</Button></Link>
    </div>
  )
}

export default ContactHeader