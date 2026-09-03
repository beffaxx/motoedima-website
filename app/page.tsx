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
import { Menu, X, ArrowRight, ArrowLeft, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const MENU = [
  { label: "Home", href: "#home", img: "/191248-889684942_medium.mp4" },
  { label: "Sicurezza", href: "#servizi", img: "/work-1.jpg" },
  { label: "Tecnologia", href: "#servizi", img: "/truck-garage.png" },
  { label: "Officina", href: "#recensioni", img: "/affidabilità.jpg" },
  { label: "Approfondimenti", href: "#approfondimenti", img: "/unnamed.webp" },
  { label: "Contatti", href: "#contatti", img: "/mtoos.webp" },
]

function Wordmark() {
  return (
    <span className="select-none text-[17px] font-bold tracking-tight text-foreground">
      Moto <span className="text-brand font-semibold">&amp;</span> Dima
    </span>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:top-6">
      <nav
        className="w-full max-w-lg rounded-[22px] border border-black/10 bg-white shadow-[0_14px_45px_-18px_rgba(0,0,0,0.38)]"
        aria-label="Primary"
      >
        <div className="flex min-h-14 items-center gap-4 px-4 py-3 sm:px-5">
          <Wordmark />
          <span className="h-5 w-px bg-black/15" aria-hidden />
          <a
            href="#home"
            className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Home
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="ml-auto grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <div
          className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <div className="px-2 pb-2">
              <p className="px-3 pb-1 pt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Menu
              </p>
              <ul>
                {MENU.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-1.5 transition-colors hover:bg-muted"
                    >
                      <span className="relative size-8 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.img || "/placeholder.svg"}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-lg font-medium text-foreground transition-colors group-hover:text-brand">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
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
    <section id="home" ref={ref} className="relative h-[220vh] bg-white">
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
  return (
    <section id="servizi" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
            <Parallax speed={0.12} className="absolute inset-x-0 -top-[12%] h-[124%]">
              <Image
                key={PILLARS[active].img}
                src={PILLARS[active].img || "/placeholder.svg"}
                alt={PILLARS[active].key}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                style={{ animation: "fadeimg 0.6s ease" }}
              />
            </Parallax>
          </div>
        </Reveal>
        <div>
          {PILLARS.map((p, i) => (
            <div key={p.key} className="border-b border-gray-100 py-5 first:pt-0">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="block text-left"
              >
                <span
                  className={`font-serif text-4xl transition-colors sm:text-5xl ${
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
                  <p className="max-w-md pt-3 leading-relaxed text-gray-600">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
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
  asChild
  className="group mt-6 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-lg active:scale-[0.98]"
>
  <a 
    href="https://www.google.com/search?q=moto+e+dima+vallo+della+lucania&oq=moto+e+dima&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBggCEEUYOTIICAMQABgWGB4yBwgEEAAY7wUyBggFEEUYPDIGCAYQRRg9MgYIBxBFGD3SAQgyNTUwajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAESzQEKuQEStgEKd0FKaVQ0dElsandyODZxUi1EeXJ3dG8xUWpsTjlBejZONU1aMzZlMWh1VVg5bVpZSlRJb1VuQVRqXzl4TkdHTVdZNzJsbkdoM2lFckpUOHpkQUJxbk1FX09UQUhVU3VEbFd5NWZnT1RHaVd6a3lMREZvVXd3eUcwEhc0RXFaYXBPNUE1dmw3X1VQaWV6VC1BcxoiQURzcjlmU2dGbE1uS2tsRE9VS2w3VDQ5aWVsSHkySlRUQRIEODA1MRoBMyoAMAA4AUAAGAAg44OwwwxKAhAB" 
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
    img: "/work-1.jpg",
    tag: "Tecnologia & Telai",
    title: "Come funziona il controllo laser del telaio a moto montata",
  },
  {
    img: "/work-2.jpg",
    tag: "Dietro le Quinte",
    title: "Rigenerazione e centratura cerchi: prima e dopo gli interventi",
  },
  {
    img: "/affidabilità.jpg",
    tag: "Sicurezza",
    title: "Saldature TIG su alluminio e acciaio: precisione al millimetro",
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
          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-black text-white hover:bg-black/80">
              Vedi tutti
            </Button>
            <button
              type="button"
              aria-label="Previous"
              className="grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-black transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-black transition-colors hover:bg-gray-50"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <article className="group cursor-pointer">
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
                <h3 className="mt-2 text-pretty text-xl font-medium leading-snug text-black">
                  {post.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const FOOTER_NAV = [
  { label: "Home", href: "#home" },
  { label: "Servizi", href: "#servizi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Approfondimenti", href: "#approfondimenti" },
  { label: "Contatti", href: "#contatti" },
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
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
const SOCIALars = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=393426641738", Icon: IconWhatsApp },
]

function FooterRoom() {
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
            {FOOTER_NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
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
              <MapPin className="size-4 text-brand shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
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
                  rel="noopener"
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
          <a href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <main className="bg-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeimg { from { opacity: 0 } to { opacity: 1 } }
        @keyframes bloom { 0%, 100% { opacity: .6; transform: scale(1) } 50% { opacity: .9; transform: scale(1.04) } }
      `}</style>
      <Navbar />
      
      <IntegratedHero />

      <Pillars />
      <Quote />
      <Insights />
      <FooterRoom />
    </main>
  )
}