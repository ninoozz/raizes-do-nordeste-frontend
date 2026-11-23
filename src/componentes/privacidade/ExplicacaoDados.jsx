import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ExplicacaoDados() {
  const [aberta, setAberta] = useState(false)

  return (
    <div className="text-sm">
      <button
        type="button"
        onClick={() => setAberta(!aberta)}
        className="flex cursor-pointer items-center gap-1 font-medium text-orange-800 hover:underline"
      >
        Por que pedimos esses dados?
        <ChevronDown className={`size-4 transition-transform ${aberta ? 'rotate-180' : ''}`} />
      </button>

      {aberta && (
        <div className="mt-2 space-y-1 rounded-md bg-stone-100 p-3 text-stone-700">
          <p>
            <span className="font-medium">Nome:</span> para chamar você na hora da retirada.
          </p>
          <p>
            <span className="font-medium">E-mail:</span> para enviar o comprovante do pedido.
          </p>
          <p>
            <span className="font-medium">Celular:</span> para avisar quando o pedido estiver pronto.
          </p>
          <p className="pt-1 text-stone-500">Não vendemos nem compartilhamos seus dados com outras empresas.</p>
        </div>
      )}
    </div>
  )
}
