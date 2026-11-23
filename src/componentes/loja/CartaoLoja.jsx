import { ChevronRight, Clock, Store } from 'lucide-react'

export default function CartaoLoja({ loja, onClick }) {
  const fechada = !loja.aberta

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={fechada}
      className="flex w-full cursor-pointer items-center gap-4 rounded-md border border-stone-200 bg-white p-4 text-left hover:border-orange-300 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-stone-50"
    >
      <span className={`grid size-12 shrink-0 place-items-center rounded-md ${fechada ? 'bg-stone-200 text-stone-400' : 'bg-orange-100 text-orange-700'}`}>
        <Store className="size-6" />
      </span>

      <span className="flex-1">
        <span className={`block font-medium ${fechada ? 'text-stone-400' : ''}`}>
          {loja.cidade} – {loja.nome}
        </span>
        <span className="block text-sm text-stone-500">{loja.endereco}</span>
        <span className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
          {fechada ? (
            <span className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 text-stone-600">
              <Clock className="size-3.5" />
              Fechada, abre às {loja.abreAs}
            </span>
          ) : (
            <span className="rounded bg-green-100 px-2 py-0.5 text-green-800">Aberta agora</span>
          )}
          {loja.cozinha === 'reduzida' && <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800">Cardápio reduzido</span>}
        </span>
      </span>

      {!fechada && <ChevronRight className="size-5 text-stone-400" />}
    </button>
  )
}
