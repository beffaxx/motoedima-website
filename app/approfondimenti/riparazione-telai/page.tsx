'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, Share2, Menu, X, CheckCheck, Phone, MapPin } from 'lucide-react'

/* ==========================================================================
   CONSTANTS & SOCIALS
   ========================================================================== */

const NAV_LINKS = [
  { label: "Servizi", href: "/#servizi", img: "/work-1.jpg" },
  { label: "Tecnologia", href: "/#tecnologia", img: "/truck-garage.png" },
  { label: "Recensioni", href: "/#recensioni", img: "/affidabilità.jpg" },
  { label: "Approfondimenti", href: "/approfondimenti", img: "/unnamed.webp" },
  { label: "Contatti", href: "/#contatti", img: "/mtoos.webp" },
]

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Recensioni", href: "/#recensioni" },
  { label: "Approfondimenti", href: "/approfondimenti" },
  { label: "Contatti", href: "/#contatti" },
]

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.1v-3.6a6.35 6.35 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.5a6.34 6.34 0 0 0 10.86 4.46V11a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.19-.57z" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

const SOCIALars = [
  { label: "Facebook", href: "https://www.facebook.com/p/Moto-Dima-100063820253483/", Icon: IconFacebook },
  { label: "Instagram", href: "https://www.instagram.com/moto_e_dima/", Icon: IconInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@moto.e.dima", Icon: IconTikTok },
  { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=393426641738", Icon: IconWhatsApp },
]

/* ==========================================================================
   NAVBAR COMPONENT
   ========================================================================== */

function LogoBadge() {
  return (
    <Link
      href="/"
      aria-label="Home Moto & Dima"
      className="relative flex size-9 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105 shrink-0"
    >
      <Image
        src="/icon.svg"
        alt="Logo Moto & Dima"
        fill
        sizes="36px"
        className="object-cover"
        priority
      />
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const whatsappUrl = "https://api.whatsapp.com/send?phone=393426641738"

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        className="w-full max-w-sm sm:max-w-md md:max-w-fit rounded-3xl md:rounded-full bg-white/95 backdrop-blur-md border border-black/10 p-2.5 sm:px-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] transition-all duration-300"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <LogoBadge />

          <div className="hidden items-center gap-6 md:flex px-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                  ? pathname === "/"
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#1f90cc] font-semibold"
                      : "text-gray-700 hover:text-[#1f90cc]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[#1f90cc]" />
                  )}
                </Link>
              )
            })}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 rounded-full bg-[#1f90cc] px-4 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-[#197bb1]"
          >
            <Phone className="size-3" />
            Chiama
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="grid size-9 place-items-center rounded-full bg-gray-100 text-black transition-colors hover:bg-gray-200 md:hidden shrink-0"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <div
          className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <div className="pt-4 px-1 pb-1">
              <p className="pb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Menu
              </p>

              <ul className="space-y-1">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : item.href.startsWith("/#")
                      ? pathname === "/"
                      : pathname.startsWith(item.href)

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-3 rounded-xl p-2 transition-colors ${
                          isActive ? "bg-[#1f90cc]/10" : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="relative size-9 overflow-hidden rounded-lg bg-gray-100 shrink-0">
                          <Image
                            src={item.img || "/placeholder.svg"}
                            alt=""
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </span>
                        <span
                          className={`text-base font-medium transition-colors ${
                            isActive
                              ? "text-[#1f90cc] font-semibold"
                              : "text-gray-900 group-hover:text-[#1f90cc]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f90cc] py-3 text-xs font-semibold text-white transition-opacity active:scale-[0.98] hover:bg-[#197bb1]"
                >
                  <Phone className="size-4" />
                  Chiama su WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

/* ==========================================================================
   FOOTER COMPONENT
   ========================================================================== */

function FooterRoom() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#121212] text-white border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-tight text-white">
              Moto & Dima
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Assistenza meccanica e banchi dima di precisione.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            {FOOTER_NAV.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm border-b border-white/10">
          <div>
            <p className="font-semibold text-white mb-2">Indirizzo</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Via+de+Hippolytis,+114+Vallo+della+Lucania+SA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-start gap-2 text-white/80 transition-colors hover:text-white group"
            >
              <MapPin className="size-4 text-[#1f90cc] shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
              <span>Via de Hippolytis, 114<br />Vallo della Lucania (SA)</span>
            </a>
          </div>

          <div>
            <p className="font-semibold text-white mb-2">Contatti & Orari</p>
            <p className="text-white/80">
              Email:{" "}
              <a href="mailto:motoedima@gmail.com" className="underline underline-offset-4 hover:text-white">
                motoedima@gmail.com
              </a>
            </p>
            <p className="text-white/80 mt-1">Lun - Ven: 08:00 - 19:00 | Sab: 08:00 - 13:00</p>
          </div>

          <div>
            <p className="font-semibold text-white mb-2">Social</p>
            <div className="flex gap-3">
              {SOCIALars.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[#a10036]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>© 2026 Moto & Dima. Tutti i diritti riservati.</p>
          <Link href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================================================
   MAIN PAGE EXPORT
   ========================================================================== */

export default function RiparazioneTelaiPage() {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleCopyLink = async () => {
    // Riproduce il suono da public/click.mp3
    try {
      const audio = new Audio('/click.mp3')
      audio.volume = 0.5
      await audio.play()
    } catch (err) {
      console.error('Errore riproduzione audio:', err)
    }

    // Copia il link e attiva l'animazione di entrata
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      
      // Piccolo ritardo per applicare la classe di entrata
      setTimeout(() => setIsVisible(true), 10)

      // Avvia la chiusura automatica con animazione di uscita
      setTimeout(() => {
        handleCloseToast()
      }, 3600)
    } catch (err) {
      console.error('Errore durante la copia del link:', err)
    }
  }

  const handleCloseToast = () => {
    setIsVisible(false)
    // Aspetta la fine della transizione CSS (300ms) prima di smontare il componente
    setTimeout(() => {
      setCopied(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-12">
          <Link
            href="/approfondimenti"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Tutti i Servizi
          </Link>

          {/* Pulsante Condividi con funzione di copia e suono */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            Condividi
          </button>
        </div>

        {/* Toast Notifica con animazione Entrata e Uscita */}
        {copied && (
          <div
            className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-between gap-4 w-[calc(100%-2.5rem)] sm:w-auto sm:max-w-md bg-[#eaf7f0] border border-[#d2f0e0] text-emerald-950 px-4 py-3.5 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                <CheckCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-emerald-950 leading-snug">
                  Link copiato!
                </p>
                <p className="text-xs text-emerald-700/80 mt-0.5 leading-snug">
                  Il link della pagina è pronto da condividere.
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseToast}
              className="p-1 rounded-lg text-emerald-700/60 hover:text-emerald-950 hover:bg-emerald-100/50 transition-colors shrink-0"
              aria-label="Chiudi notifica"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Article Header */}
<header className="mb-12">
  <p className="text-sm text-gray-500 font-mono mb-4">MOTO & DIMA — OFFICINA</p>
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] text-gray-950">
    Riparazione e Raddrizzatura Telai Moto: Precisione Laser e Sicurezza Assoluta
  </h1>
</header>

<hr className="border-gray-100 my-10" />

{/* Author / Metadata & Intro Section */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
  <div className="md:col-span-3 flex items-center gap-3 self-start">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
      <img src="/icon.svg" alt="Logo" className="w-full h-full object-contain" />
    </div>
    <div>
      <p className="text-xs text-gray-500">Servizio a cura di</p>
      <p className="text-sm font-semibold text-gray-900">Moto & Dima</p>
    </div>
  </div>

  <div className="md:col-span-9 space-y-6 text-lg text-gray-700 leading-relaxed">
    <p className="font-medium text-gray-900 leading-relaxed">
      Garantire l&apos;allineamento perfetto del telaio è fondamentale per la stabilità, la precisione d&apos;inserimento in curva e la sicurezza totale su strada e pista. Presso la nostra officina a Vallo della Lucania, combiniamo sistemi di misurazione laser avanzati e banchi dime di alta precisione.
    </p>
    <p>
      A seguito di un impatto, una caduta o per un semplice controllo strutturale, effettuiamo verifiche millimetriche delle geometrie originali del costruttore. Ogni nostro intervento garantisce il pieno ripristino delle rigidità strutturali e delle caratteristiche dinamiche ideali della moto.
    </p>
  </div>
</div>

{/* Main Asset Section (Foto al posto del Video) */}
<section className="my-12">
  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
    <Image
      src="/placeholder.svg"
      alt="Verifica e raddrizzatura telaio su banco dime presso Moto & Dima"
      fill
      className="object-cover"
      priority
    />
  </div>
  <p className="text-xs text-gray-500 mt-3 text-center">
    Processo di verifica e allineamento millimetrico della struttura su banco dime digitale presso la nostra officina a Vallo della Lucania.
  </p>
</section>

        {/* Content Paragraph */}
        <section className="max-w-2xl mx-auto my-12 text-lg text-gray-700 leading-relaxed space-y-6">
          <p>
            Con l&apos;impiego di attrezzature di livello professionale, interveniamo con la massima accuratezza su telai in alluminio, tralicci in acciaio e lega leggera per qualsiasi tipologia di moto — dalle stradali alle sportive fino alle enduro —, garantendo parametri dimensionali perfettamente identici a quelli di fabbrica.
          </p>
        </section>

        {/* Image Comparison / Cards Grid */}
        <section className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-200 mb-3">
                <Image
                  src="/placeholder.svg"
                  alt="Diagnostica e Misurazione Laser Telaio"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-center text-gray-800">
                1. Diagnostica &amp; Misurazione Laser
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-200 mb-3">
                <Image
                  src="/placeholder.svg"
                  alt="Raddrizzatura e Calibrazione Finale Telaio"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-center text-gray-800">
                2. Raddrizzatura &amp; Calibrazione Finale
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Esempio delle fasi di rilievo tolleranze e ripristino geometrico eseguito su dime specializzate.
          </p>
        </section>

        {/* Quote Block */}
        <blockquote className="my-16 border-l-2 border-black pl-6 py-2 text-xl italic text-gray-800">
          &ldquo;La precisione della ciclistica è ciò che separa una guida incerta da una guida sicura, fluida e performante.&rdquo;
        </blockquote>
      </main>

      {/* Footer Component */}
      <FooterRoom />
    </div>
  )
}