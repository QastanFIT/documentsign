'use client'

import { useRedirect } from "@/hooks/use-redirect"
import i18nConfig from "@/i18nConfig"
import { redirect, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home () {
    const pathname = usePathname();
    
    useEffect(()=>{
        const locale = pathname.split('/')[0]
        if(!locale || !i18nConfig.locales.includes(locale)){
            redirect(i18nConfig.defaultLocale)
        }
    }, [])

    return <></>
}