import { Store, Zap } from 'lucide-react'

function Opcao({ selecionada, onClick, icone: Icone, titulo, texto }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-start gap-2 rounded-md border p-3 text-left text-sm ${
        selecionada ? 'border-orange-600 bg-orange-50' : 'border-stone-300 bg-white'
      }`}
    >
      <Icone className={`mt-0.5 size-4 shrink-0 ${selecionada ? 'text-orange-700' : 'text-stone-400'}`} />
      <span>
        <span className="block font-medium">{titulo}</span>
        <span className="block text-xs text-stone-500">{texto}</span>
      </span>
    </button>
  )
}

export default function EscolhaRetirada({ retirada, onChange }) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium">Onde vai retirar o pedido?</div>
      <div className="grid grid-cols-2 gap-2">
        <Opcao
          selecionada={retirada === 'balcao'}
          onClick={() => onChange('balcao')}
          icone={Store}
          titulo="Retirar no balcão"
          texto="Pegue com o atendente"
        />
        <Opcao
          selecionada={retirada === 'pickup'}
          onClick={() => onChange('pickup')}
          icone={Zap}
          titulo="Retirar no pick-up"
          texto="Pegue direto na vitrine"
        />
      </div>
    </div>
  )
}
