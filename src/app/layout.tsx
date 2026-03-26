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
import dynamic from "next/dynamic";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const AdminGalleryModal = dynamic(() => import("@/components/AdminGalleryModal").then(m => m.AdminGalleryModal), { ssr: false });
const CreateTicketModal = dynamic(() => import("@/components/support/CreateTicketModal"), { ssr: false });
const ImageViewerModal = dynamic(() => import("@/components/support/ImageViewerModal"), { ssr: false });

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
          <AdminGalleryModal />
          <CreateTicketModal />
          <ImageViewerModal />
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <Suspense fallback={<div className="h-[40px] bg-slate-900 w-full" />}>
                  <TopBar />
                </Suspense>
                <div className="sticky top-0 z-[200] w-full shadow-sm">
                  <Suspense fallback={<div className="h-[80px] md:h-[104px] bg-white w-full border-b border-gray-100" />}>
                    <Header />
                  </Suspense>
                  <Suspense fallback={<div className="h-[48px] bg-white w-full shadow-sm" />}>
                    <Navbar />
                  </Suspense>
                </div>
                <main className="flex-grow pb-24 lg:pb-0">
                  {children}
                </main>
                <Toaster position="top-right" />
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
        <Script 
          src="//code.tidio.co/uyhnfqwkon69wwzdjm91rvz3qmqmxxop.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
