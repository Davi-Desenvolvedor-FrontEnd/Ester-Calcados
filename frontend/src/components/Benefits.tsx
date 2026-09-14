import { MessageCircle, PackageCheck, Truck } from 'lucide-react'

const ITENS = [
  {
    icon: Truck,
    titulo: 'Frete Grátis',
    descricao: 'Para todo o Brasil',
  },
  {
    icon: PackageCheck,
    titulo: 'Parcele em até 6x',
    descricao: 'Sem juros no cartão',
  },
  {
    icon: MessageCircle,
    titulo: 'Atendimento via WhatsApp',
    descricao: 'Tire suas dúvidas',
  },
]

export default function Benefits() {
  return (
    <section
      aria-label="Benefícios da loja"
      className="grid grid-cols-1 gap-4 rounded-xl2 bg-white p-6 shadow-card sm:grid-cols-3"
    >
      {ITENS.map(({ icon: Icon, titulo, descricao }) => (
        <div key={titulo} className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-plum-600">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-plum-900">{titulo}</p>
            <p className="text-xs text-plum-500">{descricao}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
