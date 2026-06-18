import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Dra. Karla Saraiva | Ginecologista e Obstetra em São Paulo - CRM 208027",
  description:
    "Dra. Karla Saraiva, especialista em Obstetrícia e Ginecologia em São Paulo. Pré-natal de alto e baixo risco, parto humanizado, consultas ginecológicas, planejamento gestacional, inserção de DIU e Implanon. Atendimento personalizado na Lalutie Clinic, Jardim Paulista.",
  keywords: [
    "ginecologista são paulo",
    "obstetra são paulo",
    "pré-natal alto risco",
    "pré-natal baixo risco",
    "parto humanizado são paulo",
    "parto cesárea são paulo",
    "consulta ginecológica",
    "planejamento gestacional",
    "dra karla saraiva",
    "medicina fetal são paulo",
    "ultrassonografia obstétrica",
    "inserção diu são paulo",
    "implanon são paulo",
    "lalutie clinic",
    "ginecologista jardim paulista",
    "obstetra jardim paulista",
    "ginecologia são paulo",
    "obstetrícia são paulo",
    "saúde da mulher",
    "médica ginecologista",
    "consulta pós parto",
    "acompanhamento gestacional",
  ],
  authors: [{ name: "Dra. Karla Saraiva" }],
  creator: "Dra. Karla Saraiva",
  publisher: "Dra. Karla Saraiva",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://drakarlasaraiva.com.br",
    title: "Dra. Karla Saraiva | Ginecologista e Obstetra em São Paulo - CRM 208027",
    description:
      "Especialista em Obstetrícia e Ginecologia com atendimento humanizado em São Paulo. Pré-natal, parto, consultas ginecológicas e planejamento gestacional na Lalutie Clinic, Jardim Paulista.",
    siteName: "Dra. Karla Saraiva - Ginecologista e Obstetra",
    images: [
      {
        url: "https://drakarlasaraiva.com.br/images/dra-karla-about.jpg",
        width: 1200,
        height: 630,
        alt: "Dra. Karla Saraiva - Ginecologista e Obstetra em São Paulo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Karla Saraiva | Ginecologista e Obstetra em São Paulo",
    description:
      "Especialista em Obstetrícia e Ginecologia com atendimento humanizado. Pré-natal, parto e consultas ginecológicas em São Paulo.",
    images: ["https://drakarlasaraiva.com.br/images/dra-karla-about.jpg"],
    creator: "@drakarlasaraiva",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://drakarlasaraiva.com.br",
  },
  category: "Healthcare",
  metadataBase: new URL("https://drakarlasaraiva.com.br"),
  icons: {
    icon: [
      { url: "/images/logo-simples.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-simples.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/logo-simples.png",
    apple: [{ url: "/images/logo-simples.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "geo.region": "BR-SP",
    "geo.placename": "São Paulo",
    "geo.position": "-23.5712;-46.6632",
    "ICBM": "-23.5712, -46.6632",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#c0a080" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PMJ6KLP9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMJ6KLP9');`}
        </Script>
      </body>
    </html>
  )
}
