'use client'
import React, { useState } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { format } from 'date-fns'
import { Info, X } from 'lucide-react'
import { useTranslation } from 'react-i18next';

const SideNav = ({data}:{data?:DocumentObject | null}) => {
    const { t } = useTranslation()
    const [is_open, setis_open] = useState(false);
  return (
    <>
    <button onClick={()=>{setis_open(prev=>!prev)}} className='flex sm:hidden fixed z-[21] left-4 bottom-4 bg-slate-100 w-10 h-10 rounded-full justify-center items-center hover:bg-slate-200'>
        {!is_open ? <Info className='w-4'/> : <X className='w-4'/>}
    </button>
    <div className={`${is_open ? 'fixed left-0 z-20 max-w-[250px]' : 'max-w-0 px-0'} sm:max-w-[250px] sm:px-4 duration-200 overflow-hidden w-full flex flex-col gap-4 right-0 h-full bg-slate-100 p-4`}>
        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Verzender')}</p>
            {data ? <p className='text-base'>{data?.useremail}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Ontvanger')}</p>
            {data ? <p>{data?.oCurrentRecipient.clientemail}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Titel')}</p>
            {data ? <p>{data?.title}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Omschrijving')}</p>
            {data ? <p>{data?.description}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Aangemaakt op')}</p>
            {data ? <p>{format(new Date(data?.datecreated), "d/MM/yyyy")}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='px-0 py-0 duration-200 rounded-none bg-slate-100 hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200'>
            <p className='text-sm font-medium text-slate-600'>{t('Geldig tot')}</p>
            {data ? <p>{format(new Date(data?.validuntil), "d/MM/yyyy")}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>
    </div>
    </>
  )
}

export default SideNav