import { Suspense } from "react";

type LayoutProps = {
    children: React.ReactNode;
    params: { locale: string };
}
  
export default function DocumentLayout({children}:LayoutProps) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}