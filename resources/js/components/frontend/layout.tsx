import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden selection:bg-secondary selection:text-white">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            {showFooter && <Footer />}
        </div>
    );
}
