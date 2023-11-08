'use client'

import { josefin } from '@/app/layout'
import { Check, Eraser, Loader2, Mail, MonitorSmartphone, PenTool, Trash2, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

const SigningOptions = ({data, refetch}:{data:DocumentObject, refetch:()=>void}) => {
    const [is_open, setis_open] = useState(false);

    const EmailOption = () => {
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
                        : 'Code versturen'
                    }</Button>    
                    :
                    <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                        isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>Ondertekenen...</>
                        : isErrorSigning ? <><X className='w-4'/>Er liep iets mis</>
                        : isSuccessSigning ? <><Check className='w-4'/>Ondertekent</>
                        : 'Ondertekenen'
                    }</Button>   
                    }
                </SheetContent>
            </Sheet>
        )
    }

    const DrawOption = () => {
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
                    const {data:response} = await axios.post(`api/document/validate`, {
                        documenttoken:data.documenttoken,
                        confirmationcode: code,
                        company: company,
                        firstname: firstname,
                        name: lastname,
                        function: company_function,
                        email:data.clientemail,
                        image: signature_base
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
                            : 'Code versturen'
                        }</Button>    
                        :
                        <Button onClick={()=>{validate()}} disabled={isSuccessSigning || isPendingSigning || isComplete()} className={`bg-orange-600 gap-2 ${isErrorSigning && 'shadow-md shadow-red-300 bg-red-600 hover:bg-red-600'}`}>{
                            isPendingSigning ? <><Loader2 className='w-4 animate-spin'/>Ondertekenen...</>
                            : isErrorSigning ? <><X className='w-4'/>Er liep iets mis</>
                            : isSuccessSigning ? <><Check className='w-4'/>Ondertekent</>
                            : 'Ondertekenen'
                        }</Button>   
                        }
                </SheetContent>
            </Sheet>
        )
    }

  return (
    <div className={` ${is_open ? 'p-2 bg-white shadow-xl gap-2' : ''} fixed bottom-10  rounded-md flex items-center z-10`}>
        <button onClick={()=>{setis_open(false)}} className={`${is_open ? 'scale-100 w-6 h-6' : 'scale-0 w-0 h-0'} bg-neutral-300 text-white flex justify-center items-center rounded-full hover:bg-neutral-400 duration-200`}>
            <X className='w-4'/>
        </button>

        <EmailOption />

        <button disabled={data.status === 2} onClick={()=>{setis_open(true)}} className={`${!is_open ? 'h-12 px-6' : 'w-0 h-0 overflow-hidden'} bg-orange-600 active:scale-95 active:bg-orange-700 text-white rounded-full font-medium flex gap-2 items-center disabled:bg-neutral-500`}>
            {data.status !== 2 ? 'Ondertekenen'
            : <><Check className='w-4' strokeWidth={2}/>Ondertekent</>
            }
        </button>

        <DrawOption />

        <button className={`${is_open ? 'scale-100 w-20 min-w-[80px] h-20 min-h-[80px]' : 'scale-0 w-0 h-0'} rounded-md bg-neutral-50 text-neutral-400 flex flex-col items-center justify-center gap-1 hover:bg-orange-50 hover:text-orange-500 hover:border hover:border-orange-500 duration-200`}>
            <MonitorSmartphone className='w-5'/>
            <p className={`${josefin.className} font-medium text-sm`}>ID Viewer</p>
        </button>
    </div>
  )
}

export default SigningOptions