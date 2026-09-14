import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      aria-label="Nova coleção"
      className="relative overflow-hidden rounded-xl2 bg-linear-to-br from-brand-50 via-brand-100/70 to-plum-200/60 shadow-soft"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Texto */}
        <div className="flex flex-col justify-center gap-4 px-8 py-12 sm:px-12 lg:py-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-brand-500">
            NOVA COLEÇÃO
          </span>
          <h1 className="font-sans text-6xl font-semibold leading-tight text-plum-900">
            Estilo que
            <br />
            te acompanha
          </h1>
          <p className="max-w-xs text-plum-700">
            Calçados, óculos e bolsas para todos os momentos.
          </p>
          <a
            href="#destaques"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-plum-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-plum-700"
          >
            Ver coleção
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Imagens dos produtos em destaque */}
        <div className="relative flex items-end justify-center gap-4 px-6 pb-0 pt-6 sm:gap-8 lg:pb-6">
          <img
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format&fit=crop"
            alt="Sandália de salto bloco na cor nude"
            className="h-48 w-28 rounded-t-full object-cover object-top shadow-soft sm:h-64 sm:w-36"
          />
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop"
            alt="Óculos de sol redondo com armação dourada"
            className="mb-10 h-28 w-28 rounded-2xl object-cover shadow-soft sm:mb-16 sm:h-36 sm:w-36"
          />
          <img
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop"
            alt="Bolsa feminina rosa com alça de corrente"
            className="h-40 w-32 rounded-t-2xl object-cover shadow-soft sm:h-56 sm:w-40"
          />
        </div>
      </div>
    </section>
  )
}
