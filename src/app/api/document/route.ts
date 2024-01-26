import { NextRequest } from "next/server"
import axios from 'axios'

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')

    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}document?documenttoken=${token}`)
        if(data.errorcode!==0){throw new Error()}
        return new Response(JSON.stringify(data.content.document))
    } catch (error) {
        //console.log(error)
        return new Response('Something went wrong', {status:500})
    }
}