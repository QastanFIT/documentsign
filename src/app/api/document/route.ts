import { NextRequest, NextResponse } from "next/server"
import axios from 'axios'

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')
    const documentpassword = request.nextUrl.searchParams.get('documentpassword')

    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}document?documenttoken=${token}&documentpassword=${documentpassword}`)
        if(data.errorcode!==0){throw new Error(data.content)}
        return new Response(JSON.stringify(data.content.document))
    } catch (error) {
        //console.log(error)
        return new Response('Something went wrong' + error, {status:500})
    }
}

export const OPTIONS = async (request: NextRequest) => {
    return new NextResponse('', {
      status: 200
    })
}