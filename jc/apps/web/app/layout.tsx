import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/src/components/nav/Navegation';
import { Footer } from '@/src/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FlxMotor - Plataforma Automotiva de Angola',
    template: '%s | FlxMotor'
  },
  description: 'Plataforma completa para vistoria, compra e venda de veículos em Angola. Oficinas certificadas e carros verificados.',
  keywords: ['carros Angola', 'oficinas Luanda', 'vistoria veicular', 'carros usados', 'mecânica automotiva'],
  authors: [{ name: 'FlxMotor Team' }],
  creator: 'FlxMotor',
  publisher: 'FlxMotor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_AO',
    url: 'https://flxmotor.ao',
    siteName: 'FlxMotor',
    title: 'FlxMotor - Plataforma Automotiva de Angola',
    description: 'Encontre oficinas certificadas e carros verificados em Angola',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlxMotor - Plataforma Automotiva de Angola',
    description: 'Encontre oficinas certificadas e carros verificados em Angola',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#005b52" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}