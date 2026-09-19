import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import { ComparisonProvider } from '@/context/ComparisonContext';
import { AdminProvider } from '@/context/AdminContext';
import { ProductsProvider } from '@/context/ProductsContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import ClientComparisonBar from '@/components/ui/ClientComparisonBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtual Store | Modern E-Commerce Platform",
  description: "Discover amazing products at great prices on our modern e-commerce platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <ProductsProvider>
          <AdminProvider>
            <CartProvider>
              <ComparisonProvider>
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <ClientComparisonBar />
              </ComparisonProvider>
            </CartProvider>
          </AdminProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
