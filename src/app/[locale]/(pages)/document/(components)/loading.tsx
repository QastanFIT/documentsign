import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <main className='bg-white h-full flex flex-col justify-center items-center bg-gradient-to-bl from-[#91c8ed2d] via-[#fa9eed2d] to-[#ff7b003d]'>
        <div className='flex flex-col items-center justify-center gap-2 p-10 bg-white border shadow-lg rounded-xl'>
            <Skeleton className='w-12 min-h-[48px] h-12 flex justify-center items-center text-white mb-10 rounded-lg'/>
            
            <Skeleton className='w-[225px] rounded-md h-9'/>
            <Skeleton className='w-[300px] rounded-md h-6'/>

            <div className='mt-10'>
                <div className='flex gap-1 sm:gap-4'>
                    {Array(6).fill('').map((_,i)=>(
                        <Skeleton key={`otp-slot-${i}`} className='w-16 h-16 rounded-md'/>
                    ))}
                </div>
            </div>            
        </div>
    </main>
  )
}

export default Loading