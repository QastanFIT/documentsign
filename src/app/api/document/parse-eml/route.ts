export const dynamic = 'force-dynamic'

import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request:Request) {
    const body = await request.json()
    try {
        console.log(body)
        return new Response(JSON.stringify({message:'hi'}))
    } catch (error:any) {
        return Response.json({error:'Error'}, { status:422 })
    }
}

export const OPTIONS = async (request: NextRequest) => {
    return new NextResponse('', {
      status: 200
    })
}