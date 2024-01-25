import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'DigitalSign | Makkelijk Digitaal Signeren',
    description: 'Onderteken je documenten waar je maar wil en wanneer je maar wil, dankzij DigitalSign van Qastan.',
  }

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        {children}
        </>
    )
  }
  