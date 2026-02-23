import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import BottomNav from "@/components/BottomNav";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alinggon - Online Shopping",
  description: "Experience premium online shopping with Alinggon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800 font-normal antialiased min-h-screen flex flex-col`}>
        <ReduxProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <Suspense fallback={<div className="h-10 bg-slate-900 w-full" />}>
                  <TopBar />
                </Suspense>
                <div className="sticky top-0 z-[200] w-full shadow-sm">
                  <Suspense fallback={<div className="h-20 bg-white w-full border-b border-gray-100" />}>
                    <Header />
                  </Suspense>
                  <Suspense fallback={<div className="h-12 bg-white w-full shadow-sm" />}>
                    <Navbar />
                  </Suspense>
                </div>
                <main className="flex-grow pb-24 lg:pb-0">
                  {children}
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <CartDrawer />
                </Suspense>
                <Suspense fallback={null}>
                  <FloatingActionButtons />
                </Suspense>
                <Suspense fallback={null}>
                  <BottomNav />
                </Suspense>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
