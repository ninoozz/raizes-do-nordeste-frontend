import { Minus, Plus } from 'lucide-react'

export default function ControleQuantidade({ quantidade, onMenos, onMais, grande = false }) {
  const tamanho = grande ? 'size-12' : 'size-9'

  return (
    <div className="inline-flex items-center rounded-md border border-stone-300 bg-white">
      <button type="button" onClick={onMenos} aria-label="Diminuir" className={`grid ${tamanho} cursor-pointer place-items-center text-stone-600 hover:text-orange-700`}>
        <Minus className="size-4" />
      </button>
      <span className={`w-7 text-center font-medium ${grande ? 'text-lg' : 'text-sm'}`}>{quantidade}</span>
      <button type="button" onClick={onMais} aria-label="Aumentar" className={`grid ${tamanho} cursor-pointer place-items-center text-stone-600 hover:text-orange-700`}>
        <Plus className="size-4" />
      </button>
    </div>
  )
}
