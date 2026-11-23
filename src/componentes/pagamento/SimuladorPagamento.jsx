import { FlaskConical } from 'lucide-react'
import { cenariosDeTeste } from '../../servicos/pagamentoExterno'

export default function SimuladorPagamento({ cenario, onChange }) {
  return (
    <div className="rounded-md border border-dashed border-stone-300 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-stone-500">
        <FlaskConical className="size-3.5" />
        Ambiente de teste: resposta do serviço de pagamento
      </p>
      <div className="grid grid-cols-3 gap-1">
        {cenariosDeTeste.map(({ id, rotulo }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`h-8 cursor-pointer rounded text-xs font-medium ${cenario === id ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {rotulo}
          </button>
        ))}
      </div>
    </div>
  )
}
