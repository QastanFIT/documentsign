import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { format } from 'date-fns'

const SideNav = ({data}:{data?:DocumentObject | null}) => {
  return (
    <div className='flex flex-col gap-4 right-0 h-full bg-slate-100 p-4 max-w-[250px] w-full'>
        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Verzender</p>
            {data ? <p className='text-base'>{data?.useremail}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Ontvanger</p>
            {data ? <p>{data?.clientemail}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Titel</p>
            {data ? <p>{data?.title}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Omschrijving</p>
            {data ? <p>{data?.description}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Aangemaakt op</p>
            {data ? <p>{format(new Date(data?.datecreated), "d/MM/yyyy")}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>

        <div className='bg-slate-100 py-0 px-0 rounded-none hover:rounded-md hover:py-1 hover:px-2 hover:bg-slate-200 duration-200'>
            <p className='text-slate-600 text-sm font-medium'>Geldig tot</p>
            {data ? <p>{format(new Date(data?.validuntil), "d/MM/yyyy")}</p> : <Skeleton size='2xl' className='w-[150px] bg-slate-200 rounded-sm'/> }
        </div>
        </div>
  )
}

export default SideNav