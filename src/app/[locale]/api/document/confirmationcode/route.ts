import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request:Request) {
    const body = await request.json()
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}document/setconfirmationcode`, body)
        if(data.errorcode!==0){throw new Error()}
        return new Response(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status:500})
    }
}

export const OPTIONS = async (request: NextRequest) => {
    return new NextResponse('', {
      status: 200
    })
}