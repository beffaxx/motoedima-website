"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ArrowRight, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

// ==========================================
// COMPONENTE SKELETON
// ==========================================
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Skeleton Navbar */}
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <div className="h-14 w-full max-w-md rounded-full bg-gray-200 border border-gray-100 shadow-sm" />
      </div>

      {/* Skeleton Hero Section */}
      <section className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-6 relative">
        <div className="space-y-4 text-center max-w-xl w-full flex flex-col items-center">
          <div className="h-12 bg-gray-300 rounded-lg w-3/4"></div>
          <div className="h-12 bg-gray-300 rounded-lg w-1/2"></div>
        </div>

        {/* Video Placeholder Container */}
        <div className="mt-8 h-64 w-full max-w-3xl rounded-3xl bg-gray-300 shadow-inner"></div>

        <div className="absolute bottom-6 h-4 w-16 bg-gray-300 rounded"></div>
      </section>

      {/* Skeleton Pillars Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="aspect-square w-full bg-gray-200 rounded-2xl"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </section>
    </div>
  )
}

// ==========================================
// FUNZIONI UTILI E UTILITIES
// ==========================================
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setP(total > 0 ? clamp(-rect.top / total) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])
  return p
}

function Parallax({
  speed = 0.15,
  className,
  children,
}: {
  speed?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const documentTop = el.getBoundingClientRect().top + window.scrollY
    const update = () => {
      const fromCentre =
        documentTop - window.scrollY + el.offsetHeight / 2 - window.innerHeight / 2
      setStyle({
        transform: `translate3d(0, ${(-fromCentre * speed).toFixed(2)}px, 0)`,
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform" }}>
      {children}
    </div>
  )
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const NAV_LINKS = [
  { label: "Home", path: "/", targetId: "hero", img: "/work-1.jpg", isPage: true },
  { label: "Servizi", path: "/#servizi", targetId: "servizi", img: "/laser.jpg", isPage: false },
  { label: "Chi Siamo", path: "/chi-siamo", targetId: "", img: "/truck-garage.png", isPage: true },
  { label: "Recensioni", path: "/#recensioni", targetId: "recensioni", img: "/affidabilità.jpg", isPage: false },
  { label: "Approfondimenti", path: "/#approfondimenti", targetId: "approfondimenti", img: "/unnamed.webp", isPage: false },
  { label: "Contatti", path: "/#contatti", targetId: "contatti", img: "/mtoos.webp", isPage: false },
]

function LogoBadge({ onScrollToTarget }: { onScrollToTarget: () => void }) {
  return (
    <button
      type="button"
      onClick={onScrollToTarget}
      aria-label="Torna ad Home"
      className="relative flex size-9 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105 shrink-0 cursor-pointer"
    >
      <Image
        src="/icon.svg"
        alt="Logo Moto & Dima"
        fill
        className="object-cover"
        priority
      />
    </button>
  )
}

function Navbar({
  activePath,
  onNavigate,
}: {
  activePath: string
  onNavigate: (link: (typeof NAV_LINKS)[number]) => void
}) {
  const [open, setOpen] = useState(false)
  const whatsappUrl = "https://api.whatsapp.com/send?phone=393426641738"

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        className="w-full max-w-sm sm:max-w-md md:max-w-fit rounded-3xl md:rounded-full bg-white/95 backdrop-blur-md border border-black/10 p-2.5 sm:px-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] transition-all duration-300"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <LogoBadge onScrollToTarget={() => onNavigate({ label: "Home", path: "/home", targetId: "hero", img: "", isPage: false })} />

          <div className="hidden items-center gap-6 md:flex px-2">
            {NAV_LINKS.map((link) => {
              const isActive = activePath === link.path
              
              if (link.isPage) {
                return (
                  <Link
                    key={link.label}
                    href={link.path}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive ? "text-[#1f90cc] font-semibold" : "text-gray-700 hover:text-[#1f90cc]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              }

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => onNavigate(link)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? "text-[#1f90cc] font-semibold"
                      : "text-gray-700 hover:text-[#1f90cc]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[#1f90cc]" />
                  )}
                </button>
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
            className="grid size-9 place-items-center rounded-full bg-gray-100 text-black transition-colors hover:bg-gray-200 md:hidden shrink-0 cursor-pointer"
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
                  const isActive = activePath === item.path

                  if (item.isPage) {
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.path}
                          onClick={() => setOpen(false)}
                          className="group flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-100"
                        >
                          <span className="relative size-9 overflow-hidden rounded-lg bg-gray-100 shrink-0">
                            <Image src={item.img} alt="" fill sizes="36px" className="object-cover" />
                          </span>
                          <span className="text-base font-medium text-gray-900 group-hover:text-[#1f90cc]">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    )
                  }

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false)
                          onNavigate(item)
                        }}
                        className={`group flex w-full items-center gap-3 rounded-xl p-2 transition-colors cursor-pointer ${
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
                      </button>
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

const FLOATING_CARDS = [
  { id: 1, src: "/laser.jpg", pos: "top-[12%] left-[6%] md:left-[10%]", size: "w-32 h-32 sm:w-44 sm:h-44" },
  { id: 2, src: "/work-1.jpg", pos: "top-[10%] right-[6%] md:right-[12%]", size: "w-36 h-36 sm:w-48 sm:h-48" },
  { id: 3, src: "/truck-garage.png", pos: "top-[40%] left-[2%] sm:left-[4%]", size: "w-36 h-36 sm:w-52 sm:h-52" },
  { id: 4, src: "/mtoos.webp", pos: "top-[38%] right-[2%] sm:right-[4%]", size: "w-36 h-36 sm:w-52 sm:h-52" },
  { id: 5, src: "/work-2.jpg", pos: "bottom-[8%] left-[6%] md:left-[10%]", size: "w-36 h-36 sm:w-48 sm:h-48" },
  { id: 6, src: "/affidabilità.jpg", pos: "bottom-[6%] right-[6%] md:right-[12%]", size: "w-36 h-36 sm:w-48 sm:h-48" },
]

const LINE1 = "La tua moto al top."
const LINE2 = "Senza compromessi."
const TOTAL = LINE1.length + LINE2.length

function TypeLine({ text, shown }: { text: string; shown: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{ opacity: i < shown ? 1 : 0, transition: "opacity 80ms linear" }}
        >
          {ch}
        </span>
      ))}
    </>
  )
}

function IntegratedHero() {
  const ref = useRef<HTMLElement>(null)
  const p = useSectionProgress(ref)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      setTyped((current) => {
        if (current >= TOTAL) return current
        timer = setTimeout(tick, 50)
        return current + 1
      })
    }
    timer = setTimeout(tick, 150)
    return () => clearTimeout(timer)
  }, [])

  const textOpacity = clamp(1 - p / 0.12)
  const shrinkP = clamp(p / 0.22)
  const moveP = clamp((p - 0.22) / 0.23)

  const width = `calc(100vw * ${(1 - shrinkP).toFixed(4)} + ${(240 * shrinkP).toFixed(2)}px)`
  const height = `calc(100svh * ${(1 - shrinkP).toFixed(4)} + ${(240 * shrinkP).toFixed(2)}px)`
  const borderRadius = `${(shrinkP * 28).toFixed(1)}px`
  const translateY = -shrinkP * 180 + moveP * 60

  const contentOpacity = clamp((p - 0.18) / 0.2)
  const floatScale = clamp((p - 0.18) / 0.2)

  const shown = Math.max(typed, Math.round(shrinkP * TOTAL))
  const shown1 = Math.min(shown, LINE1.length)
  const shown2 = Math.max(0, shown - LINE1.length)

  return (
    <section id="hero" ref={ref} className="relative h-[220vh] bg-white">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-white">
        
        <div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-start justify-center pb-[12vh] pl-[8vw] md:pl-[12vw]"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-left font-serif text-[10vw] leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.3)] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            <span>
              <TypeLine text={LINE1} shown={shown1} />
            </span>
            <br />
            <span>
              <TypeLine text={LINE2} shown={shown2} />
            </span>
          </h1>
        </div>

        <div
          className="relative z-20 flex items-center justify-center will-change-transform"
          style={{
            width,
            height,
            borderRadius,
            transform: `translate3d(0, ${translateY}px, 0)`,
            boxShadow: shrinkP > 0.05 ? "0 25px 60px -12px rgba(0, 0, 0, 0.25)" : "none",
          }}
        >
          <div className="relative h-full w-full overflow-hidden" style={{ borderRadius }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center"
              aria-label="Video officina Moto e Dima"
            >
              <source src="/191248-889684942_medium.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div
          className="absolute z-10 max-w-3xl px-6 text-center transition-all duration-300"
          style={{
            opacity: contentOpacity,
            transform: `translate3d(0, ${150 - moveP * 20}px, 0)`,
          }}
        >
          <h2 className="font-serif text-3xl font-normal leading-snug tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            I nostri standard, la tua sicurezza.
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-gray-600 sm:text-lg md:text-xl">
            Soluzioni meccatroniche di precisione e tarature dima personalizzate per assicurarti il massimo controllo e prestazioni su ogni curva.
          </p>
        </div>

        {FLOATING_CARDS.map((card) => (
          <div
            key={card.id}
            className={`absolute z-10 overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${card.pos} ${card.size}`}
            style={{
              opacity: contentOpacity,
              transform: `scale(${floatScale})`,
            }}
          >
            <Image
              src={card.src}
              alt="Dettaglio lavorazione"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        ))}

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs font-medium uppercase tracking-widest text-black/40"
          style={{ opacity: clamp(1 - p / 0.08) }}
        >
          Scroll
        </div>
      </div>
    </section>
  )
}

const PILLARS = [
  {
    key: "Sicurezza",
    img: "/laser.jpg",
    body: "Controlli laser e sistemi di misurazione certificati per garantirti la massima stabilità e protezione su strada.",
  },
  {
    key: "Precisione",
    img: "/work-2.jpg",
    body: "Interventi millimetrici su telai, cerchi e forcelle grazie a tecnologia all'avanguardia e rigore artigianale.",
  },
  {
    key: "Affidabilità",
    img: "/affidabilità.jpg",
    body: "Diagnosi meccatroniche avanzate, ricambi di alta qualità e trasparenza totale per interventi garantiti nel tempo.",
  },
]

function Pillars() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const totalHeight = rect.height - window.innerHeight
      const currentScroll = -rect.top
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight))
      
      if (progress < 0.33) {
        setActive(0)
      } else if (progress < 0.66) {
        setActive(1)
      } else {
        setActive(2)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="servizi" ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden py-12">
        <div className="mx-auto grid max-w-6xl w-full items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-x-0 -top-[12%] h-[124%]">
                <Image
                  key={PILLARS[active].img}
                  src={PILLARS[active].img || "/placeholder.svg"}
                  alt={PILLARS[active].key}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                  style={{ animation: "fadeimg 0.6s ease" }}
                />
              </div>
            </div>
          </div>

          <div>
            {PILLARS.map((p, i) => (
              <div key={p.key} className="border-b border-gray-100 py-5 first:pt-0">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="block text-left cursor-pointer"
                >
                  <span
                    className={`font-serif text-4xl transition-colors duration-300 sm:text-5xl ${
                      active === i ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {p.key}
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: active === i ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="max-w-md pt-3 leading-relaxed text-gray-600">
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section id="recensioni" className="bg-white px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:aspect-[16/8]">
          <Parallax speed={0.12} className="absolute inset-x-0 -top-[12%] h-[124%]">
            <Image src="/unnamed.webp" alt="test" fill sizes="100vw" className="object-cover" />
          </Parallax>
        </div>

        <Reveal className="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
          <div className="mt-[-3rem] max-w-md rounded-2xl border border-white/15 bg-black/60 p-8 text-white shadow-2xl backdrop-blur-lg md:mt-0">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex text-amber-400">{"★".repeat(5)}</div>
              <span className="text-xs font-medium text-white/70">Recensione Google</span>
            </div>

            <p className="text-base leading-relaxed text-white">
              “Mi sono trovato davvero bene. Personale competente, disponibile e sempre pronto a spiegare il lavoro svolto sulla moto. L&apos;intervento è stato eseguito nei tempi previsti con grande attenzione ai dettagli. Officina pulita, prezzi onesti e tanta professionalità. Se cercate un meccanico serio per manutenzione o riparazioni della vostra moto, Moto e Dima è sicuramente una scelta che consiglio. Tornerò sicuramente.”
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/beffaxx-avatar.webp"
                alt="Beffaxx"
                width={44}
                height={44}
                className="size-11 rounded-full border border-white/30 object-cover"
              />
              <div>
                <p className="font-semibold text-white">Beffaxx</p>
                <p className="text-sm text-white/70">Cliente Verificato</p>
              </div>
            </div>

            <Button 
              className="group mt-6 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-lg active:scale-[0.98]"
            >
              <a 
                href="https://www.google.com/search?q=moto+e+dima+vallo+della+lucania" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between"
              >
                <span className="text-left">Leggi tutte le recensioni</span>
                <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const INSIGHTS = [
  {
    title: "Come funciona il controllo laser del telaio a moto montata",
    slug: "riparazione-telai",
    tag: "Tecnologia",
    img: "/placeholder.svg",
  },
  {
    title: "Importanza della misurazione della geometria",
    slug: "misurazione-geometria",
    tag: "Manutenzione",
    img: "/placeholder.svg",
  },
  {
    title: "Come preparare la moto per il tracciamento",
    slug: "preparazione-moto",
    tag: "Consigli",
    img: "/placeholder.svg",
  },
]

function Insights() {
  return (
    <section id="approfondimenti" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <h2 className="font-serif text-6xl tracking-tight text-black sm:text-7xl">
                Approfondimenti.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md leading-relaxed text-gray-600">
                Scopri le nostre lavorazioni speciali, i dettagli sulla tecnologia dima e i consigli tecnici per la cura della tua moto.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <Link href={`/approfondimenti/${post.slug}`} className="group block cursor-pointer">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={post.img || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-widest text-black/60">
                    {post.tag}
                  </p>
                  <h3 className="mt-2 text-pretty text-xl font-medium leading-snug text-black group-hover:text-[#1f90cc] transition-colors">
                    {post.title}
                  </h3>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

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
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=393426641738", Icon: IconWhatsApp },
]

function FooterRoom({ onNavigate }: { onNavigate: (link: (typeof NAV_LINKS)[number]) => void }) {
  return (
    <footer id="contatti" className="relative w-full overflow-hidden bg-[#121212] text-white border-t border-white/10 py-12">
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
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => onNavigate(l)}
                className="text-white/80 transition-colors hover:text-white cursor-pointer"
              >
                {l.label}
              </button>
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
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[#1f90cc]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>© 2026 Moto & Dima. Tutti i diritti riservati.</p>
          <a href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

// ==========================================
// COMPONENTE PRINCIPALE (PAGE)
// ==========================================
export default function Page() {
  const [activePath, setActivePath] = useState("/home")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname === "/" ? "/home" : window.location.pathname)
    }

    // Simula o gestisce l'inizializzazione dei componenti della pagina
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800) // Cambia o rimuovi il timer se usi chiamate API reali

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (link: (typeof NAV_LINKS)[number]) => {
    setActivePath(link.path)
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", link.path)
    }

    if (link.targetId) {
      if (link.targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const el = document.getElementById(link.targetId)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  useEffect(() => {
    if (loading) return

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      if (isAtBottom) {
        if (activePath !== "/contatti") {
          setActivePath("/contatti")
          window.history.replaceState(null, "", "/contatti")
        }
        return
      }

      const internalSections = NAV_LINKS.filter((l) => !l.isPage && l.targetId).map((link) => ({
        path: link.path,
        targetId: link.targetId,
        el: document.getElementById(link.targetId),
      }))

      const scrollPos = window.scrollY + window.innerHeight / 3

      if (window.scrollY < window.innerHeight * 0.5) {
        if (activePath !== "/home") {
          setActivePath("/home")
          window.history.replaceState(null, "", "/home")
        }
        return
      }

      for (let i = internalSections.length - 1; i >= 0; i--) {
        const sec = internalSections[i]
        if (sec.el && sec.el.offsetTop <= scrollPos) {
          if (activePath !== sec.path) {
            setActivePath(sec.path)
            window.history.replaceState(null, "", sec.path)
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activePath, loading])

  // Ritorna lo skeleton durante la fase di loading
  if (loading) {
    return <PageSkeleton />
  }

  return (
    <main className="bg-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeimg { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
      <Navbar activePath={activePath} onNavigate={handleNavigate} />
      <IntegratedHero />
      <Pillars />
      <Quote />
      <Insights />
      <FooterRoom onNavigate={handleNavigate} />
    </main>
  )
}