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
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <TopBar />
              <div className="sticky top-0 z-[200] w-full shadow-sm">
                <Header />
                <Navbar />
              </div>
              <main className="flex-grow pb-24 lg:pb-0">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <FloatingActionButtons />
              <BottomNav />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
