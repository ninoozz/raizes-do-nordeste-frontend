import { Clock } from 'lucide-react'
import { nomeDoCanal } from '../../dados/pedidos'

export default function CartaoCozinha({ pedido, botao, onAvancar }) {
  const minutos = Math.max(0, Math.floor((Date.now() - pedido.criadoEm) / 60000))
  const atrasado = minutos > 10 && pedido.status !== 'pronto'

  let observacao = ''
  if (pedido.consumo) observacao = pedido.consumo === 'aqui' ? 'Comer aqui' : 'Para levar'
  if (pedido.retirada === 'pickup') observacao = 'Retirada no pick-up'

  return (
    <div
      className={`rounded-md border-2 p-3 ${atrasado ? 'border-red-500' : 'border-stone-200'} ${pedido.status === 'pronto' ? 'bg-stone-100' : 'bg-white'}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-lg font-semibold">#{pedido.numero}</span>
        <span className="flex items-center gap-3 text-sm text-stone-500">
          <span className="rounded bg-stone-200 px-1.5 py-0.5 text-xs font-medium text-stone-700">{nomeDoCanal[pedido.canal]}</span>
          <span className={`flex items-center gap-1 ${atrasado ? 'font-semibold text-red-600' : ''}`}>
            <Clock className="size-3.5" />
            {minutos} min
          </span>
        </span>
      </div>

      <div className="space-y-0.5 text-sm">
        {pedido.itens.map((item) => (
          <p key={item.id}>
            <span className="font-semibold">{item.quantidade}x</span> {item.nome}
          </p>
        ))}
      </div>
      {observacao && <p className="mt-2 text-xs font-medium text-orange-800 uppercase">{observacao}</p>}

      {botao && (
        <button
          type="button"
          onClick={onAvancar}
          className="mt-3 h-10 w-full cursor-pointer rounded-md bg-stone-800 text-sm font-medium text-white hover:bg-stone-900"
        >
          {botao}
        </button>
      )}
    </div>
  )
}
