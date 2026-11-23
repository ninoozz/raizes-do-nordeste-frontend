import { TicketPercent } from 'lucide-react'
import { useLoja } from '../../contextos/LojaContext'

export default function AvisoPromocao({ totem = false }) {
  const { cupons } = useLoja()
  const ativos = cupons.filter((c) => c.ativo)

  if (ativos.length === 0) return null

  return (
    <div className={`mb-5 flex gap-3 rounded-md bg-yellow-100 p-3 text-yellow-900 ${totem ? 'text-lg' : 'text-sm'}`}>
      <TicketPercent className={`shrink-0 ${totem ? 'mt-1 size-6' : 'mt-0.5 size-5'}`} />
      <div>
        <p className="font-medium">Promoções de hoje</p>
        {ativos.map((c) => (
          <p key={c.codigo}>
            Cupom <span className="font-semibold">{c.codigo}</span>: {c.percentual}% de desconto no pedido.
          </p>
        ))}
        <p className="text-yellow-800">{totem ? 'Digite o cupom na hora de pagar.' : 'Digite o cupom no carrinho.'}</p>
      </div>
    </div>
  )
}
