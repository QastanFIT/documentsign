import { NextRequest } from "next/server"
import CardReader from 'eid-lib'
import assert from "assert";

export async function GET(request: NextRequest) {
    const base = request.nextUrl.searchParams.get('base64')
    if(!base){ return new Response('No base64 found', {status:404}) }

    const cardReader = new CardReader("beidpkcs11.dll")
    try {
        if(cardReader.HasCard()) {
            // Sign
            const data = Buffer.from(base, "base64");

            // after calling this the middelware will ask you your pin code
            let signeddata = cardReader.SignWithCard(data, "Authentication");
            if(signeddata === null){ return new Response('Cancelled EID signature', {status:500}) }
            assert.notStrictEqual(signeddata, null);
            // Verification
            assert.strictEqual(cardReader.Verify(data, signeddata, cardReader.GetCertificateAuthenticationFile()), true);

            // Sign and Verify a file on the card
            const idFile = cardReader.GetIdFile();
            const idSignatureFile = cardReader.GetIdSignatureFile();
            const certificateRRN = cardReader.GetCertificateRNFile();
            assert.strictEqual(cardReader.Verify(idFile, idSignatureFile, certificateRRN), true);
            return new Response('Document signed')
        } else {
            console.log("No card detected")
            return new Response('No card detected', {status:404})
        }
    } catch (e) {
        console.error(e);
    } finally {
        cardReader.Finalize();
    }
    return new Response('Cancelled EID signature', {status:500})
}