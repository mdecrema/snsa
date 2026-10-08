import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swissnaturalskincare.ch'), // Sostituisci con il tuo dominio reale
  title: {
    default: 'Swiss Natural Skincare Association',
    template: '%s | Swiss Natural Skincare Association', // Aggiunge automaticamente la coda nei titoli delle sottopagine
  },
  description: 'Promuoviamo standard elevati, innovazione e accreditamento nella dermatologia e cosmesi naturale in Svizzera.',
  icons: {
    icon: '/images/image_logo_1_edited.png',
  },
  openGraph: {
    title: 'Swiss Natural Skincare Association',
    description: 'Promuoviamo standard elevati nella dermatologia e cosmesi naturale.',
    url: 'https://www.swissnaturalskincare.ch',
    siteName: 'Swiss Natural Skincare Association',
    locale: 'it_CH',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
