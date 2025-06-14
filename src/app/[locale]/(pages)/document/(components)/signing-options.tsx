'use client'

import { josefin } from '@/assets/fonts/josefin'
import { Check, Eraser, Loader2, Mail, MonitorSmartphone, PenTool, RotateCcw, Trash2, X, XCircle, UploadCloud, HelpCircle } from 'lucide-react'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../../../../../components/ui/sheet'
import { Label } from '../../../../../components/ui/label'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import lottie from 'lottie-web';
import * as animationData from '@/assets/animations/card-citizen-id.json'
import * as dndData from '@/assets/animations/drag-and-drop.json'
import toast, {Toaster} from 'react-hot-toast'
import { first, isEqual } from "lodash"
import { isAfter, isBefore } from 'date-fns'
import open_app from '@/assets/images/help_open_app.svg'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import { CONFIG } from '@/constants/config'
import { hasSingleSigningOption } from '@/lib/utils'

type OptionProps = {
    defaultOpen?: boolean
    is_open: boolean
    data: DocumentObject
    setis_open: any;
    refetch: any
    password?: string
    token: string
}

const EmailOption = ({is_open, data, setis_open, refetch, password, token, defaultOpen}:OptionProps) => {
    const { t } = useTranslation()
    const [sheet_open, setsheet_open] = useState<boolean>(defaultOpen || false);
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [company, setcompany] = useState('');
    const [company_function, setcompany_function] = useState('');
    const [code, setcode] = useState('');

    const [is_success, setis_success] = useState(false);

    useEffect(()=>{
        if(sheet_open !== defaultOpen && typeof defaultOpen === "boolean"){ setsheet_open(defaultOpen) }
    }, [defaultOpen])
    
    const { isPending, mutate:sendConfirmationCode, isSuccess, isError, reset } = useMutation({
        mutationFn: async () => {
            try {
                setis_success(false)
                const {data:response} = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/setconfirmationcode`, {documenttoken:token, documentpassword:password})
                return response
            } catch (error) {
                throw new Error('')
            }
        },
        onError: () => { setTimeout(()=>{reset()}, 1500) },
        onSuccess: () => { setTimeout(()=>{ setis_success(true) }, 1500) }
    })

    const { isPending:isPendingSigning, mutate:validate, isSuccess:isSuccessSigning, isError:isErrorSigning, reset:resetSigning } = useMutation({
        mutationFn: async () => {
            try {
                const {data:response} = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/validate`, {
                    documenttoken:token,
                    confirmationcode: code,
                    company: company,
                    firstname: firstname,
                    name: lastname,
                    function: company_function,
                    email: data.oCurrentRecipient.clientemail
                })
                if(response.errorcode===0){
                    setsheet_open(false);
                    setis_open(false)
                    refetch()
                }
                else {
                    throw new Error(response?.content || '')
                }
                return response
            } catch (error) {
                throw new Error('')
            }
        },
        onError: () => { setTimeout(()=>{resetSigning()}, 1500) },
    })

    function isComplete() {
        let disable = true;

        if(data.oCurrentRecipient.clientemail.length>1 && code.length>1 && lastname.length>0 && company.length>0){ disable = false }

        return disable
    }

    return (
        <Sheet onOpenChange={(o)=>{setsheet_open(o)}} open={sheet_open}>
            <SheetTrigger asChild>
            <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                <Mail className='w-5'/>
                <p className={`${josefin.className} font-medium text-sm`}>{t('Email')}</p>
            </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center max-h-[95dvh] overflow-auto">
                <div className='grid w-full max-w-xl gap-4 mx-4 sm:grid-cols-2'>
                    <div className='col-span-full'>
                        <Label>{t('E-mailadres')} <span className='text-orange-600'>*</span></Label>
                        <Input disabled value={data.oCurrentRecipient.clientemail} type='email'/>
                    </div>
                    <div>
                        <Label htmlFor='voornaam'>{t('Voornaam')}</Label>
                        <Input id='voornaam' value={firstname} onChange={({currentTarget})=>{setfirstname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='familienaam'>{t('Familienaam')} <span className='text-orange-600'>*</span></Label>
                        <Input id='familienaam' value={lastname} onChange={({currentTarget})=>{setlastname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='bedrijf'>{t('Bedrijf')} <span className='text-orange-600'>*</span></Label>
                        <Input id='bedrijf' value={company} onChange={({currentTarget})=>{setcompany(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='functie'>{t('Functie')}</Label>
                        <Input id='functie' value={company_function} onChange={({currentTarget})=>{setcompany_function(currentTarget.value)}}/>
                    </div>
                    {isSuccess && 
                    <div>
                        <Label>{t('Code')} <span className='text-orange-600'>*</span></Label>
                        <Input value={code} onChange={({currentTarget})=>{setcode(currentTarget.value)}}/>
                    </div>
                    }
                </div>
                {!is_success ? 
                <Button onClick={()=>{if(!isSuccess){sendConfirmationCode()}}} disabled={isPending || isError} className={`gap-2`}>{
                    isPending ? <><Loader2 className='w-4 animate-spin'/>{t('Even geduld')}...</> 
                    : isError ? <><X className='w-4'/>{t('Er liep iets mis')}</>
                    : isSuccess ? <><Check className='w-4'/>{t('Mail verstuurd')}</>
                    : t('Ondertekenen')
                }</Button>    
                :
                <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                    isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>{t('Ondertekenen')}...</>
                    : isErrorSigning ? <><X className='w-4'/>{t('Er liep iets mis')}</>
                    : isSuccessSigning ? <><Check className='w-4'/>{t('Ondertekend')}</>
                    : t('Ondertekenen')
                }</Button>   
                }
            </SheetContent>
        </Sheet>
    )
}

const DrawOption = ({is_open, data, setis_open, refetch, password, token, defaultOpen}:OptionProps) => {
    const [sheet_open, setsheet_open] = useState<boolean>(defaultOpen || false);
    const { t } = useTranslation()
    const sketchRef = useRef<ReactSketchCanvasRef | null>(null)
    const [eraserMode, seteraserMode] = useState(false);

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [company, setcompany] = useState('');
    const [company_function, setcompany_function] = useState('');
    const [code, setcode] = useState('');
    const [signature_base, setsignature_base] = useState('');

    const [is_success, setis_success] = useState(false);

    useEffect(()=>{
        if(sheet_open !== defaultOpen && typeof defaultOpen === "boolean"){ setsheet_open(defaultOpen) }
    }, [defaultOpen])

    const { isPending, mutate:sendConfirmationCode, isSuccess, isError, reset } = useMutation({
        mutationFn: async () => {
            try {
                setis_success(false)
                const {data:response} = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/setconfirmationcode`, {documenttoken:token, documentpassword:password})
                toast.success(t('De code wordt verstuurd naar uw e-mailadres dit kan even duren'), {
                    duration: 5000
                })
                return response
            } catch (error) {
                throw new Error('')
            }
        },
        onError: () => { setTimeout(()=>{reset()}, 1500) },
        onSuccess: () => { setTimeout(()=>{ setis_success(true) }, 1500) }
    })

    const { isPending:isPendingSigning, mutate:validate, isSuccess:isSuccessSigning, isError:isErrorSigning, reset:resetSigning } = useMutation({
        mutationFn: async () => {
            try {
                let obj = {
                    documenttoken:token,
                    confirmationcode: code,
                    company: company,
                    firstname: firstname,
                    name: lastname,
                    function: company_function,
                    email:data.oCurrentRecipient.clientemail,
                    image: signature_base
                }
                const {data:response} = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/validate`, obj)
                if(response.errorcode===0){
                    setis_open(false);
                    setsheet_open(false);
                    refetch()
                }
                else {
                    throw new Error(response?.content || '')
                }
                return response
            } catch (error) {
                throw new Error('')
            }
        },
        onError: () => { setTimeout(()=>{resetSigning()}, 1500) },
    })

    function isComplete() {
        let disable = true;
        if(data.oCurrentRecipient.clientemail.length>1 && code.length>1 && lastname.length>0 && company.length>0&&signature_base.length>2000){ disable = false }
        return disable
    }

    async function convertToBase() {
        //@ts-ignore
        if(sketchRef.current){
            const exportBase = await sketchRef.current.exportImage('jpeg')
            setsignature_base(exportBase)
        }
    }

    useEffect(()=>{
        //@ts-ignore
        if(sketchRef.current){sketchRef.current.eraseMode(eraserMode)}
    }, [eraserMode])

    function clearSketch() {
        if(sketchRef.current){sketchRef.current.clearCanvas()}
    }

    return (
        <Sheet open={sheet_open} onOpenChange={(o)=>{setsheet_open(o)}}>
            <SheetTrigger asChild>
                <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                    <PenTool className='w-5'/>
                    <p className={`${josefin.className} font-medium text-sm`}>{t('Tekenen')}</p>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center max-h-[95dvh] overflow-auto">
                <div className='grid w-full max-w-xl gap-4 mx-4 sm:grid-cols-2'>
                    <div className='col-span-full'>
                        <Label>{t('E-mailadres')} <span className='text-orange-600'>*</span></Label>
                        <Input disabled value={data.oCurrentRecipient.clientemail} type='email'/>
                    </div>

                    <div>
                        <Label htmlFor='voornaam'>{t('Voornaam')}</Label>
                        <Input id='voornaam' value={firstname} onChange={({currentTarget})=>{setfirstname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='familienaam'>{t('Familienaam')} <span className='text-orange-600'>*</span></Label>
                        <Input id='familienaam' value={lastname} onChange={({currentTarget})=>{setlastname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='bedrijf'>{t('Bedrijf')} <span className='text-orange-600'>*</span></Label>
                        <Input id='bedrijf' value={company} onChange={({currentTarget})=>{setcompany(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='functie'>{t('Functie')}</Label>
                        <Input id='functie' value={company_function} onChange={({currentTarget})=>{setcompany_function(currentTarget.value)}}/>
                    </div>

                    <div className='col-span-full'>
                        <div className='flex items-end justify-between'>
                            <Label>{t('Handtekening')} <span className='text-orange-600'>*</span></Label>

                            <div className='flex items-end'>
                                <button className={`${!eraserMode ? 'text-orange-600' : ''} w-7 h-7 rounded-sm flex justify-center items-center text-neutral-400`} onClick={()=>{seteraserMode(false)}}>
                                    <PenTool className='w-4'/>
                                </button>
                                <button className={`${eraserMode ? 'text-orange-600' : ''} w-7 h-7 rounded-sm flex justify-center items-center text-neutral-400`} onClick={()=>{seteraserMode(prev=>!prev)}}>
                                    <Eraser className='w-4'/>
                                </button>
                                <button className={`w-7 h-7 rounded-sm flex justify-center items-center text-neutral-400`} onClick={()=>{clearSketch()}}>
                                    <Trash2 className='w-4'/>
                                </button>
                            </div>
                        </div>
                        
                        <ReactSketchCanvas
                            onChange={()=>{convertToBase()}}
                            ref={sketchRef}
                            eraserWidth={15}
                            height="300"
                            strokeWidth={4}
                            strokeColor="#475569"
                            className='border w-full !border-input'
                        />
                    </div>

                    {isSuccess && 
                    <div>
                        <Label>{t('Code')} <span className='text-orange-600'>*</span></Label>
                        <Input value={code} onChange={({currentTarget})=>{setcode(currentTarget.value)}}/>
                    </div>
                    }
                </div>
                {!is_success ? 
                    <Button onClick={()=>{if(!isSuccess){sendConfirmationCode()}}} disabled={isPending || isError} className={`gap-2`}>{
                        isPending ? <><Loader2 className='w-4 animate-spin'/>{t('Even geduld')}...</> 
                        : isError ? <><X className='w-4'/>{t('Er liep iets mis')}</>
                        : isSuccess ? <><Check className='w-4'/>{t('Mail verstuurd')}</>
                        : t('Ondertekenen')
                    }</Button>    
                    :
                    <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                        isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>{t('Ondertekenen.')}..</>
                        : isErrorSigning ? <><X className='w-4'/>{t('Er liep iets mis')}</>
                        : isSuccessSigning ? <><Check className='w-4'/>{t('Ondertekend')}</>
                        : t('Ondertekenen')
                    }</Button>   
                }
            </SheetContent>
        </Sheet>
    )
}

type CardInformation = {
    name: string;
    nationalNumber: string;
    cardNumber: string;
    nationality: string;
}

const EidOption = ({is_open, data, setis_open, refetch, password, defaultOpen}:OptionProps) => {
    const { t } = useTranslation()
    const [sheet_open, setsheet_open] = useState<boolean>(defaultOpen || false);
    const [visible, setvisible] = useState(false);
    const [is_card_inserted, setis_card_inserted] = useState(false);
    const [card_information, setcard_information] = useState<CardInformation | null>(null);

    useEffect(()=>{
        if(sheet_open !== defaultOpen && typeof defaultOpen === "boolean"){ setsheet_open(defaultOpen) }
    }, [defaultOpen])

    // async function checkCardInserted() {
    //     try {
    //         const {data} = await axios.get(`api/eid`)
    //         setis_card_inserted(true)
    //         console.log(data)
    //         setcard_information(data)
    //     } catch (error) {
    //         if(error instanceof AxiosError){
    //             toast.error(error.response?.data, {id:'checkCardInserted', duration:3000, position:'bottom-left'})
    //             console.log(error.response?.data)
    //         }
    //         console.log(error)
    //         setis_card_inserted(false)
    //     }
    // }

    // useEffect(()=>{
    //     if(!visible){ return; }
    //     checkCardInserted()
    // }, [visible])
    

    

    const { mutate:signDocument, isError, isPending, isSuccess, reset } = useMutation({
        mutationFn: async () => {
            const { data:result } = await axios.post(`${CONFIG.NEXT_PUBLIC_API}document/validate`, {
                documenttoken: data.documenttoken,
                documentpassword: password,
                eid: true,
                email: data.oCurrentRecipient.clientemail,
                name: card_info?.name
            }) 
            if(result.errorcode!==0){ throw new Error(result.message) }
            setis_open(false)
            setsheet_open(false);
            refetch()
        },
        onError: (e) => { 
            if(e instanceof AxiosError){
                toast.error(`${e.response?.data}`, { id:'signDocument', position:'bottom-left'})
            }
            setTimeout(()=>{ reset() }, 2000) 
        }
    })

    const [is_over, setis_over] = useState(false);
    const [is_parsing, setis_parsing] = useState(false);
    const [card_info, setcard_info] = useState<CardInformation | null>(null);
    const [show_help, setshow_help] = useState(false);
    const [help_step, sethelp_step] = useState(1);

    const dndRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const animRef = useRef() as React.MutableRefObject<HTMLDivElement>
    useEffect(()=>{
        if(!show_help) { return; }
        if(help_step !== 1){ return; }
        let anim = lottie.loadAnimation({
            container: animRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: animationData
        })
        let dir:-1 | 1 = 1;
        const interval = setInterval(function () {
            if(dir == 1) {dir = -1} else {dir = 1; }
            anim.setDirection(dir);
            anim.play();
        }, 2600);

        return () => { clearInterval(interval) }
    }, [show_help, help_step])

    useEffect(()=>{

        if(help_step===3){
            lottie.loadAnimation({
                container: dndRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: dndData
            })
        }
    }, [help_step])

    const parentRef = useRef() as MutableRefObject<HTMLDivElement>
    const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>
    function handleDragOver(evt:any) {
        const parent = parentRef.current.getBoundingClientRect()
        const leftPos = evt.clientX - parent.left
        const topPos = evt.clientY - parent.top
        tooltipRef.current.style.left = leftPos+'px'
        tooltipRef.current.style.top = topPos+'px'
        setis_over(true)

        evt.stopPropagation();
		evt.preventDefault();
    }

    function handleDrop(evt:any) {
        evt.stopPropagation();
		evt.preventDefault();

        setis_over(false)

		var data;
		if(evt.dataTransfer.files.length > 0) {
			var reader = new FileReader();
			reader.onload = function(event) {
				data = reader.result;
				parseData(data);
			}
			reader.readAsText(evt.dataTransfer.files[0], "UTF-8");
		} else {

			data = evt.dataTransfer.getData("text");
			parseData(data);
		}
    }

    function handleDragLeave() {
        setis_over(false)
    }

    function validateContent(obj:any, clone:any) {
        return isEqual(obj, clone)
    }

    async function parseData(data:any) {
        setis_parsing(true)
        let xmlDoc;
		if(window.DOMParser) {
			let parser = new DOMParser();
            try {
			    xmlDoc = parser.parseFromString(data, "text/xml");
            } catch (e) {
                setis_parsing(false)                
            }
		}
        if(!xmlDoc){ setis_over(false); return ;}

        try {
            if(xmlDoc.getElementsByTagName("parsererror").length>0){ throw new Error("Invalid information") }
            var firstName = xmlDoc.getElementsByTagName("firstname")[0].childNodes[0].nodeValue;
            var lastName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            var nationality = xmlDoc.getElementsByTagName("nationality")[0].childNodes[0].nodeValue;
            //@ts-ignore
            var natNumber = xmlDoc.getElementsByTagName("identity")[0].attributes["nationalnumber"].nodeValue;
            //@ts-ignore
            var cardNumber = xmlDoc.getElementsByTagName("card")[0].attributes["cardnumber"].nodeValue

    
            const { data:result } = await axios.post(`api/eid/certificate`, {
                certificate: xmlDoc.getElementsByTagName("certificates")[0].getElementsByTagName("signing")[0].textContent
            })

            const isSameContent = validateContent({reg:natNumber, sn:lastName, fn:firstName}, {reg:result.subject.serialNumber, sn:result.subject.SN, fn:result.subject.GN})
            if(!isSameContent){ throw new Error('Invalid information')}
            if(!(isBefore(new Date(result.valid_from), new Date) && isAfter(new Date, new Date(result.valid_from)))){ throw new Error("Expired certificate") }

            setcard_info({
                name: `${firstName} ${lastName}`, 
                nationalNumber:result.subject.serialNumber, 
                nationality: nationality || "",
                cardNumber: cardNumber
            })
        } catch (e:any) {
            toast.error(e.message || "Something went wrong", {id:'parser', position:"bottom-left"})
            setis_parsing(false)
        } finally {
            setis_parsing(false)
        }
	}

   

    return (
        <>
        
        <Sheet open={sheet_open} onOpenChange={(o)=>{setsheet_open(false); setvisible(o); if(!o){ setcard_information(null); setis_card_inserted(false); setshow_help(false) }}}>
            <SheetTrigger asChild>
                <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} disabled:opacity-50 disabled:cursor-not-allowed rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                    <MonitorSmartphone className='w-5'/>
                    <p className={`${josefin.className} font-medium text-sm`}>{t('e-ID')}</p>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center max-h-[95dvh] overflow-auto">
                <Toaster />

                {show_help && <>
                <p className='text-xl font-bold text-neutral-700'>{t('Hulp uitleg')}</p>
                    
                    {help_step === 1 && <>
                        <div className="w-[175px] h-[175px] bg-slate-100 flex justify-center rounded-full">
                            <div ref={animRef} className='w-[150px] h-[200px]'></div>
                        </div>
                        <p className="max-w-xs font-medium text-center">{t('Gelieve uw kaartlezer aan te sluiten en uw identiteitskaart in te steken')}</p>
                    </>}

                    {help_step === 2 && <>
                        <div className="flex justify-center rounded-full">
                            <Image src={open_app} width={200} height={100} alt="open app" className='rounded-md'/>
                        </div>
                        <p className="max-w-xs font-medium text-center">{t('Open de applicatie')} <span className='underline'>{t('eID Viewer')}</span> {t('op uw computer')}</p>
                    </>}

                    {help_step === 3 && <>
                        <div className="flex justify-center rounded-full ">
                            <div ref={dndRef} className='w-[500px] h-[300px]'></div>
                        </div>
                        <p className="max-w-xs font-medium text-center">{t('Sleep uw foto naar het getoonde vak')}</p>
                    </>}
                        
                
                <div className='flex items-start gap-2'>
                    {help_step === 1 && <Button onClick={()=>{setshow_help(false)}} variant='secondary'>{t('Sluiten')}</Button>}
                    {help_step > 1 && <Button onClick={()=>{sethelp_step(p=>p-1)}} variant='secondary'>{t('Terug')}</Button>}
                    
                    {help_step < 3 && <Button onClick={()=>{sethelp_step(p=>p+1)}} className='bg-orange-600 hover:bg-orange-700'>{t('Volgende')}</Button>}
                    {help_step === 3 && <Button onClick={()=>{setshow_help(false); sethelp_step(1)}} className='bg-orange-600 hover:bg-orange-700'>{t('Begrepen!')}</Button>}
                </div>

                <div className='flex items-start gap-1'>
                    <div className={`${help_step===1?'w-6 bg-orange-600':'w-3 bg-orange-600/70'} h-3 rounded-full duration-500`}></div>
                    <div className={`${help_step===2?'w-6 bg-orange-600':'w-3 bg-orange-600/70'} h-3 rounded-full duration-500`}></div>
                    <div className={`${help_step===3?'w-6 bg-orange-600':'w-3 bg-orange-600/70'} h-3 rounded-full duration-500`}></div>
                </div>
                </>}

                {!show_help && <>
                {!card_info && <>
                <p className="max-w-xs text-lg font-medium text-center">{t('Upload identiteitskaart')}</p>
                <div className='flex flex-col gap-1'>
                    <div ref={parentRef} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragExit={handleDragLeave} className={`${is_over?'bg-orange-100 border-orange-600':'bg-neutral-100 border-neutral-200'} w-[500px] h-[200px] rounded-md border-2 border-dashed duration-300 relative flex flex-col justify-center items-center`}>
                        {is_parsing ? <Loader2 className='w-10 h-10 animate-spin text-neutral-700'/> :<UploadCloud className={`${is_over?'text-orange-600':'text-neutral-700'} h-10 w-10`} strokeWidth={1.5}/>}
                        <p className='font-medium'>{t('Sleep en plaats uw foto hier')}</p>
                        <div ref={tooltipRef} className={`${!is_over?'invisible':''} absolute rounded-full bg-orange-600 py-1 px-3 w-fit text-sm text-white font-medium shadow-sm select-none z-50`}>{t('identiteitskaart')}</div>
                    </div>
                    <p className='text-sm text-neutral-400'>{t('Sleep uw foto van eID viewer naar het veld hierboven')}.</p>
                    <button onClick={()=>{setshow_help(true)}} className='flex items-center justify-center gap-1 text-sm font-medium w-fit text-neutral-500 hover:underline'><HelpCircle className='w-4 h-4'/>{t('Hulp nodig?')}</button>
                </div>
                </>}

                {card_info && <>
                <div className='grid w-full max-w-xl gap-4 mx-4 sm:grid-cols-2'>
                    <div className='col-span-full'>
                        <Label>{t('E-mailadres')}</Label>
                        <Input disabled value={data.oCurrentRecipient.clientemail} type='email'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>{t('Rijksregisternummer')}</Label>
                        <Input disabled value={card_info.nationalNumber} type='text'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>{t('Kaartnummer')}</Label>
                        <Input disabled value={card_info.cardNumber} type='text'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>{t('Naam')}</Label>
                        <Input disabled value={card_info.name} type='text'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>{t('Nationaliteit')}</Label>
                        <Input disabled value={card_info.nationality} type='text'/>
                    </div>
                </div>
                <Button disabled={isPending || isError || isSuccess} onClick={()=>{signDocument()}} className={`${(!isError && !isSuccess) && 'bg-orange-600'} gap-2 ${isError && 'bg-red-600'} ${isSuccess && 'bg-green-600'}`}>
                    {isPending && <><Loader2 className='w-4 h-4 animate-spin'/> {t('Ondertekenen')}...</>}
                    {isError && <><XCircle className='w-4 h-4'/> {t('Er liep iets mis')}</>}
                    {isSuccess && <><Check className='w-4 h-4'/> {t('Ondertekend')}</>}
                    {!isSuccess && !isPending && !isError && <>{t('Ondertekenen')}</>}
                </Button>
                </>}
                </>}

                {/* {!is_card_inserted && <>
                <div className="w-[175px] h-[175px] bg-slate-100 flex justify-center rounded-full">
                    <div ref={animRef} className='w-[150px] h-[200px]'></div>
                </div>
                <p className="max-w-xs text-lg font-medium text-center">Gelieve uw kaartlezer aan te sluiten en uw identiteitskaart in te steken</p>

                <Button onClick={()=>{}} className={`bg-orange-600 gap-2`}><RotateCcw className='w-4 h-4'/> Opnieuw proberen</Button>
                </>}

                */}

            </SheetContent>
        </Sheet>
        </>
    )
}

const SigningOptions = ({data, password, token, refetch}:{data:DocumentObject, password:string, token:string, refetch:()=>void}) => {
    const [is_open, setis_open] = useState(false);
    const { t } = useTranslation()

    const singleOption = is_open ? hasSingleSigningOption(data, ["mail2faenabled", "signatureenabled", "eidenabled"]) : false

    return (
    <div className={`${(!data.mail2faenabled && !data.signatureenabled && !data.eidenabled) && 'hidden'} ${is_open ? 'p-2 bg-white shadow-xl gap-2' : ''} fixed bottom-10  rounded-md flex items-center z-10`}>
        <button onClick={()=>{setis_open(false)}} className={`${is_open ? 'scale-100 w-6 h-6' : 'scale-0 w-0 h-0'} bg-neutral-300 text-white flex justify-center items-center rounded-full hover:bg-neutral-400 duration-200`}>
            <X className='w-4'/>
        </button>
        
        {data.mail2faenabled &&
        <EmailOption is_open={is_open} data={data} password={password} setis_open={setis_open} refetch={refetch} token={token} defaultOpen={singleOption}/>
        }

        <button disabled={data.oCurrentRecipient.status === 2} onClick={()=>{setis_open(true)}} className={`${!is_open ? 'h-12 px-6' : 'w-0 h-0 overflow-hidden'} bg-orange-600 active:scale-95 active:bg-orange-700 text-white rounded-full font-medium flex gap-2 items-center disabled:bg-neutral-500`}>
            {data.oCurrentRecipient.status !== 2 
            ? t('Ondertekenen')
            : <><Check className='w-4' strokeWidth={2}/>{t('Ondertekend')}</>
            }
        </button>
        
        {data.signatureenabled && 
        <DrawOption is_open={is_open} data={data} password={password} setis_open={setis_open} refetch={refetch} token={token} defaultOpen={singleOption}/>
        }

        {data.eidenabled && 
        <EidOption is_open={is_open} data={data} password={password} setis_open={setis_open} refetch={refetch} token={token} defaultOpen={singleOption}/>
        }
    </div>
    )
}

export default SigningOptions