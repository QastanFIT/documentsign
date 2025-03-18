export default function RootLayout({ children }: any) {
    return (
        <html>
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    )
}