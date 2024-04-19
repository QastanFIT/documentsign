import { NextRequest, NextResponse } from "next/server"
import tls from "tls"
import net from "net"

export async function POST(request:Request) {
    const body = await request.json()

    const example = `-----BEGIN CERTIFICATE-----
${body.certificate}
-----END CERTIFICATE-----`
    
    try {
        //if(!encodedCert){ throw new Error('no certificate') }
        let secureContext = tls.createSecureContext({
            cert: example
        });
        let secureSocket = new tls.TLSSocket(new net.Socket(), { secureContext });
        let cert = secureSocket.getCertificate();

        return new Response(JSON.stringify(cert))
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