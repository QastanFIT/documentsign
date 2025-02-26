export default function RootLayout({ children }: any) {
    return (
        <html lang="nl">
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    )
}