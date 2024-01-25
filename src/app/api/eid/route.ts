import { NextRequest } from "next/server"
import CardReader from 'eid-lib'

export async function GET(request: NextRequest) {

    const cardReader = new CardReader("beidpkcs11.dll")
    try {
        if(cardReader.HasCard()) {
            const fullName = cardReader.GetFullName()
            const dateOfBirth = cardReader.GetDateOfBirth()
            const gender = cardReader.GetGender()
            const nationalNumber = cardReader.GetNationalNumber()          

            return new Response(JSON.stringify({name:fullName, date:dateOfBirth, gender:gender, nationalNumber:nationalNumber}))
        } else {
            return new Response('No card detected', {status:404})
        }
    } catch (e) {
        console.error(e);
        return new Response('Something went wrong', {status:500})
    } finally {
        // needs to be call before ending program!!
        cardReader.Finalize();
    }
}