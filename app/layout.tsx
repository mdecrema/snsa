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

// Meta tag ottimizzati per la SEO globale in Inglese
export const metadata: Metadata = {
  metadataBase: new URL('https://swissnaturalskincare.ch'),
  title: {
    default: 'Swiss Natural Skincare | High-Quality Swiss Natural Cosmetics',
    template: '%s | Swiss Natural Skincare', // Gestisce automaticamente i titoli delle sottopagine
  },
  description: 'Discover Swiss Natural Skincare: 100% natural ingredients, premium Swiss quality dermatology, and organic skincare products.',
  keywords: [
    'swiss natural skincare',
    'natural skincare',
    'swiss natural cosmetics',
    'swiss organic skincare',
    'natural dermatology switzerland'
  ],
  icons: {
    icon: '/images/image_logo_1_edited.png',
  },
  openGraph: {
    title: 'Swiss Natural Skincare | High-Quality Swiss Natural Cosmetics',
    description: 'Promoting high standards, innovation, and natural skincare products crafted in Switzerland.',
    url: 'https://swissnaturalskincare.ch',
    siteName: 'Swiss Natural Skincare',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/image_logo_1_edited.png',
        width: 1200,
        height: 630,
        alt: 'Swiss Natural Skincare Logo',
      },
    ],
  },
  // Indicazione delle varianti di lingua per Google (Hreflang)
  alternates: {
    canonical: 'https://swissnaturalskincare.ch',
    languages: {
      'en': 'https://swissnaturalskincare.ch',
      'it': 'https://swissnaturalskincare.ch/it',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Dati strutturati Schema.org (JSON-LD) in formato JSON
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Swiss Natural Skincare',
    'url': 'https://swissnaturalskincare.ch',
    'logo': 'https://swissnaturalskincare.ch/images/image_logo_1_edited.png',
    'description': 'Promoting high standards, innovation, and accreditation in natural dermatology and cosmetics in Switzerland.',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'CH',
    },
    'sameAs': [
      'https://www.instagram.com/snsa_association?dlrf=MTZmamZmMHFjZWZjYw==',
      'https://www.facebook.com/people/Swiss-Natural-Skincare-Association/61595892236106',
      'https://www.linkedin.com/company/swiss-natural-skincare-association/home/?viewAsMember=true'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'info@swissnaturalskincare.ch'
    },
    'knowsAbout': [
      'Natural Skincare',
      'Swiss Natural Skincare',
      'Natural Cosmetics',
      'Dermatology'
    ]
  };

  return (
    <html
      lang="en" // Impostato su "en" come lingua principale di default
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Script JSON-LD per la lettura automatica di Schema.org da parte di Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}