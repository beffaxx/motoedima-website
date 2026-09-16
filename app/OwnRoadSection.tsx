"use client"

import Image from "next/image"
import { Parallax } from "./Parallax"

type Tile = {
  src: string
  alt: string
  className: string
  speed: number
}

const COLLAGE: Tile[] = [
  { 
    src: "/about-abs-banner.png", 
    alt: "Strumentazione officina Moto e Dima", 
    className: "top-[2%] left-[2%] w-[22vw] max-w-[280px]", 
    speed: 0.35 
  },
  { 
    src: "/affidabilità.jpg", 
    alt: "Riparazione meccatronica e diagnosi", 
    className: "top-[5%] right-[2%] w-[20vw] max-w-[260px]", 
    speed: 0.45 
  },
  { 
    src: "/work-1.jpg", 
    alt: "Misurazione e riparazione cerchio", 
    className: "top-[40%] left-[1%] w-[18vw] max-w-[230px]", 
    speed: 0.25 
  },
  { 
    src: "/mtoos.webp", 
    alt: "Dettaglio componenti meccanici", 
    className: "top-[38%] right-[1%] w-[19vw] max-w-[240px]", 
    speed: 0.50 
  },
  { 
    src: "/about-abs-banner.png", 
    alt: "Certificazione e controlli di sicurezza", 
    className: "bottom-[2%] left-[4%] w-[21vw] max-w-[270px]", 
    speed: 0.40 
  },
  { 
    src: "/work-1.jpg", 
    alt: "Lavorazione telaio moto", 
    className: "bottom-[3%] right-[3%] w-[20vw] max-w-[250px]", 
    speed: 0.30 
  },
]

export default function OwnRoadSection() {
  return (
    <section className="relative min-h-0 md:min-h-[90vh] overflow-hidden bg-white py-16 sm:py-24 md:py-36 flex items-center justify-center">
      {COLLAGE.map((tile, idx) => (
        <Parallax
          key={idx}
          speed={tile.speed}
          className={`pointer-events-none absolute hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl md:block ${tile.className}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Parallax>
      ))}

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 
          style={{ animation: "fadeimg 1.2s ease-out forwards, bloom 4s ease-in-out infinite" }}
          className="font-serif text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl"
        >
          I nostri standard, la tua sicurezza.
        </h2>

        <p 
          style={{ animation: "fadeimg 1.6s ease-out forwards" }}
          className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl"
        >
          <span className="font-semibold text-black">La nostra tecnologia con sistema certificato</span> garantisce la massima precisione nella riparazione di telai, cerchi e componenti meccanici, assicurando prestazioni al top sia su strada che su pista.
        </p>
      </div>
    </section>
  )
}