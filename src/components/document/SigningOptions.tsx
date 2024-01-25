'use client'

import { josefin } from '@/app/layout'
import { Check, Eraser, Loader2, Mail, MonitorSmartphone, PenTool, RotateCcw, Trash2, X, XCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import lottie from 'lottie-web';
import * as animationData from '@/assets/animations/card-citizen-id.json'
import toast, {Toaster} from 'react-hot-toast'

type OptionProps = {
    is_open: boolean
    data: DocumentObject
    setis_open: any;
    refetch: any
}

const EmailOption = ({is_open, data, setis_open, refetch}:OptionProps) => {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [company, setcompany] = useState('');
    const [company_function, setcompany_function] = useState('');
    const [code, setcode] = useState('');

    const [is_success, setis_success] = useState(false);
    const { isPending, mutate:sendConfirmationCode, isSuccess, isError, reset } = useMutation({
        mutationFn: async () => {
            try {
                setis_success(false)
                const {data:response} = await axios.post(`api/document/confirmationcode`, {documenttoken:data.documenttoken})
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
                const {data:response} = await axios.post(`api/document/validate`, {
                    documenttoken:data.documenttoken,
                    confirmationcode: code,
                    company: company,
                    firstname: firstname,
                    name: lastname,
                    function: company_function,
                    email:data.clientemail
                })
                if(response.errorcode===0){
                    setis_open(false)
                    refetch()
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

        if(data.clientemail.length>1 && code.length>1 && lastname.length>2 && company.length>2){ disable = false }

        return disable
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
            <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                <Mail className='w-5'/>
                <p className={`${josefin.className} font-medium text-sm`}>Email</p>
            </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center">
                <div className='max-w-xl w-full mx-4 grid sm:grid-cols-2 gap-4'>
                    <div className='col-span-full'>
                        <Label>E-mailadres <span className='text-orange-600'>*</span></Label>
                        <Input disabled value={data.clientemail} type='email'/>
                    </div>
                    <div>
                        <Label htmlFor='voornaam'>Voornaam</Label>
                        <Input id='voornaam' value={firstname} onChange={({currentTarget})=>{setfirstname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='familienaam'>Familienaam <span className='text-orange-600'>*</span></Label>
                        <Input id='familienaam' value={lastname} onChange={({currentTarget})=>{setlastname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='bedrijf'>Bedrijf <span className='text-orange-600'>*</span></Label>
                        <Input id='bedrijf' value={company} onChange={({currentTarget})=>{setcompany(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='functie'>Functie</Label>
                        <Input id='functie' value={company_function} onChange={({currentTarget})=>{setcompany_function(currentTarget.value)}}/>
                    </div>
                    {isSuccess && 
                    <div>
                        <Label>Code <span className='text-orange-600'>*</span></Label>
                        <Input value={code} onChange={({currentTarget})=>{setcode(currentTarget.value)}}/>
                    </div>
                    }
                </div>
                {!is_success ? 
                <Button onClick={()=>{if(!isSuccess){sendConfirmationCode()}}} disabled={isPending || isError} className={`gap-2`}>{
                    isPending ? <><Loader2 className='w-4 animate-spin'/>Even geduld...</> 
                    : isError ? <><X className='w-4'/>Er liep iets mis</>
                    : isSuccess ? <><Check className='w-4'/>Mail verstuurd</>
                    : 'Ondertekenen'
                }</Button>    
                :
                <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                    isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>Ondertekenen...</>
                    : isErrorSigning ? <><X className='w-4'/>Er liep iets mis</>
                    : isSuccessSigning ? <><Check className='w-4'/>Ondertekend</>
                    : 'Ondertekenen'
                }</Button>   
                }
            </SheetContent>
        </Sheet>
    )
}

const DrawOption = ({is_open, data, setis_open, refetch}:OptionProps) => {
    const sketchRef = useRef<ReactSketchCanvasRef | null>(null)
    const [eraserMode, seteraserMode] = useState(false);

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [company, setcompany] = useState('');
    const [company_function, setcompany_function] = useState('');
    const [code, setcode] = useState('');
    const [signature_base, setsignature_base] = useState('');

    const [is_success, setis_success] = useState(false);
    const { isPending, mutate:sendConfirmationCode, isSuccess, isError, reset } = useMutation({
        mutationFn: async () => {
            try {
                setis_success(false)
                const {data:response} = await axios.post(`api/document/confirmationcode`, {documenttoken:data.documenttoken})
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
                    documenttoken:data.documenttoken,
                    confirmationcode: code,
                    company: company,
                    firstname: firstname,
                    name: lastname,
                    function: company_function,
                    email:data.clientemail,
                    image: signature_base
                }
                console.log(obj)
                const {data:response} = await axios.post(`api/document/validate`, obj)
                if(response.errorcode===0){
                    setis_open(false)
                    refetch()
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
        if(data.clientemail.length>1 && code.length>1 && lastname.length>2 && company.length>2&&signature_base.length>4000){ disable = false }
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
        <Sheet>
            <SheetTrigger asChild>
                <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                    <PenTool className='w-5'/>
                    <p className={`${josefin.className} font-medium text-sm`}>Tekenen</p>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center">
                <div className='max-w-xl w-full mx-4 grid sm:grid-cols-2 gap-4'>
                    <div className='col-span-full'>
                        <Label>E-mailadres <span className='text-orange-600'>*</span></Label>
                        <Input disabled value={data.clientemail} type='email'/>
                    </div>

                    <div>
                        <Label htmlFor='voornaam'>Voornaam</Label>
                        <Input id='voornaam' value={firstname} onChange={({currentTarget})=>{setfirstname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='familienaam'>Familienaam <span className='text-orange-600'>*</span></Label>
                        <Input id='familienaam' value={lastname} onChange={({currentTarget})=>{setlastname(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='bedrijf'>Bedrijf <span className='text-orange-600'>*</span></Label>
                        <Input id='bedrijf' value={company} onChange={({currentTarget})=>{setcompany(currentTarget.value)}}/>
                    </div>
                    <div>
                        <Label htmlFor='functie'>Functie</Label>
                        <Input id='functie' value={company_function} onChange={({currentTarget})=>{setcompany_function(currentTarget.value)}}/>
                    </div>

                    <div className='col-span-full'>
                        <div className='flex justify-between items-end'>
                            <Label>Handtekening <span className='text-orange-600'>*</span></Label>

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
                        <Label>Code <span className='text-orange-600'>*</span></Label>
                        <Input value={code} onChange={({currentTarget})=>{setcode(currentTarget.value)}}/>
                    </div>
                    }
                </div>
                {!is_success ? 
                    <Button onClick={()=>{if(!isSuccess){sendConfirmationCode()}}} disabled={isPending || isError} className={`gap-2`}>{
                        isPending ? <><Loader2 className='w-4 animate-spin'/>Even geduld...</> 
                        : isError ? <><X className='w-4'/>Er liep iets mis</>
                        : isSuccess ? <><Check className='w-4'/>Mail verstuurd</>
                        : 'Ondertekenen'
                    }</Button>    
                    :
                    <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                        isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>Ondertekenen...</>
                        : isErrorSigning ? <><X className='w-4'/>Er liep iets mis</>
                        : isSuccessSigning ? <><Check className='w-4'/>Ondertekend</>
                        : 'Ondertekenen'
                    }</Button>   
                    }
            </SheetContent>
        </Sheet>
    )
}

type CardInformation = {
    date: string;
    gender: string;
    name: string;
    nationalNumber: string
}

const EidOption = ({is_open, data, setis_open, refetch}:OptionProps) => {
    const [visible, setvisible] = useState(false);
    const [is_card_inserted, setis_card_inserted] = useState(false);
    const [card_information, setcard_information] = useState<CardInformation | null>(null);

    async function checkCardInserted() {
        try {
            const {data} = await axios.get(`api/eid`)
            setis_card_inserted(true)
            console.log(data)
            setcard_information(data)
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data, {id:'checkCardInserted', duration:3000, position:'bottom-left'})
                console.log(error.response?.data)
            }
            console.log(error)
            setis_card_inserted(false)
        }
    }

    useEffect(()=>{
        if(!visible){ return; }
        checkCardInserted()
    }, [visible])
    

    const animRef = useRef() as React.MutableRefObject<HTMLDivElement>
    useEffect(()=>{
        if(!visible) { return; }
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
    }, [visible])

    const { mutate:signDocument, isError, isPending, isSuccess, reset } = useMutation({
        mutationFn: async () => {
            await axios.get(`api/eid/sign?base64=${data.document}`)
            const { data:result } = await axios.post(`api/eid/validate`, {
                documenttoken: data.documenttoken,
                eid: true,
                email: data.clientemail,
                name: card_information?.name
            }) 
            if(result.errorcode!==0){ throw new Error(result.message) }
            console.log(result)
            setis_open(false)
            refetch()
        },
        onError: (e) => { 
            if(e instanceof AxiosError){
                toast.error(`${e.response?.data}`, { id:'signDocument', position:'bottom-left'})
            }
            setTimeout(()=>{ reset() }, 2000) 
        }
    })

    return (
        <>
        
        <Sheet onOpenChange={(o)=>{setvisible(o); if(!o){ setcard_information(null); setis_card_inserted(false) }}}>
            <SheetTrigger asChild>
                <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} disabled:opacity-50 disabled:cursor-not-allowed rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
                    <MonitorSmartphone className='w-5'/>
                    <p className={`${josefin.className} font-medium text-sm`}>e-ID</p>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col items-center justify-center">
                <Toaster />

                {!is_card_inserted && <>
                <div className="w-[175px] h-[175px] bg-slate-100 flex justify-center rounded-full">
                    <div ref={animRef} className='w-[150px] h-[200px]'></div>
                </div>
                <p className="text-lg font-medium max-w-xs text-center">Gelieve uw kaartlezer aan te sluiten en uw identiteitskaart in te steken</p>

                <Button onClick={()=>{checkCardInserted()}} className={`bg-orange-600 gap-2`}><RotateCcw className='w-4 h-4'/> Opnieuw proberen</Button>
                </>}

                {is_card_inserted && 
                <>
                <div className='max-w-xl w-full mx-4 grid sm:grid-cols-2 gap-4'>
                    <div className='col-span-full'>
                        <Label>E-mailadres</Label>
                        <Input disabled value={data.clientemail} type='email'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>Rijksregisternummer</Label>
                        <Input disabled value={card_information?.nationalNumber} type='text'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>Geslacht</Label>
                        <Input disabled value={card_information?.gender} type='text'/>
                    </div>
                    <div className='col-span-full'>
                        <Label>Naam</Label>
                        <Input disabled value={card_information?.name} type='text'/>
                    </div>
                </div>
                <Button disabled={isPending || isError || isSuccess} onClick={()=>{signDocument()}} className={`${(!isError && !isSuccess) && 'bg-orange-600'} gap-2 ${isError && 'bg-red-600'} ${isSuccess && 'bg-green-600'}`}>
                    {isPending && <><Loader2 className='w-4 h-4 animate-spin'/> Ondertekenen...</>}
                    {isError && <><XCircle className='w-4 h-4'/> Er liep iets mis</>}
                    {isSuccess && <><Check className='w-4 h-4'/> Ondertekend</>}
                    {!isSuccess && !isPending && !isError && <>Ondertekenen</>}
                </Button>
                </>}

            </SheetContent>
        </Sheet>
        </>
    )
}

const SigningOptions = ({data, refetch}:{data:DocumentObject, refetch:()=>void}) => {
    const [is_open, setis_open] = useState(false);

    

    return (
    <div className={` ${is_open ? 'p-2 bg-white shadow-xl gap-2' : ''} fixed bottom-10  rounded-md flex items-center z-10`}>
        <button onClick={()=>{setis_open(false)}} className={`${is_open ? 'scale-100 w-6 h-6' : 'scale-0 w-0 h-0'} bg-neutral-300 text-white flex justify-center items-center rounded-full hover:bg-neutral-400 duration-200`}>
            <X className='w-4'/>
        </button>
        
        {data.mail2faenabled &&
        <EmailOption is_open={is_open} data={data} setis_open={setis_open} refetch={refetch}/>
        }

        <button disabled={data.status === 2} onClick={()=>{setis_open(true)}} className={`${!is_open ? 'h-12 px-6' : 'w-0 h-0 overflow-hidden'} bg-orange-600 active:scale-95 active:bg-orange-700 text-white rounded-full font-medium flex gap-2 items-center disabled:bg-neutral-500`}>
            {data.status !== 2 ? 'Ondertekenen'
            : <><Check className='w-4' strokeWidth={2}/>Ondertekend</>
            }
        </button>
        
        {!data.signatureenabled && 
        <DrawOption is_open={is_open} data={data} setis_open={setis_open} refetch={refetch}/>
        }

        {!data.eidenabled && 
        <EidOption is_open={is_open} data={data} setis_open={setis_open} refetch={refetch}/>
        }
    </div>
    )
}

export default SigningOptions